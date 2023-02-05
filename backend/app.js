const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./models/user");
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');
const {ObjectId} = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = 8000;
const secret = 'yoursecretkey';
const ENCODED_USER_LIMIT = 10;

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});


const connectionURL = "mongodb+srv://syamablyat:syamablyat123@hackbu2023.vms6wku.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Register API
app.post('/api/register', (req, res) => {
  const { username, name, surname, middle_name, password } = req.body;

  // Hash the password before saving it to the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Create a new User object and save it to the database
    const user = new User({
      username,
      name,
      surname,
      middle_name,
      password: hash
    });

    user.save((error, _user) => {
      if (error) {
        return res.status(500).json({ error });
      }

      // Return a JSON Web Token to the client
      const token = jwt.sign({ id:_user.id }, secret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  });
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ token });
  });
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader === 'undefined') {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Split at the space
  const bearer = bearerHeader.split(' ');

  // Set the token
  req.token = bearer[1];

  // Verify the token
  jwt.verify(req.token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = decoded;
    console.log(decoded);
    next();
  });
};

const runEncode = async (imageSrc, username, resolve, reject) => {
  const script = spawn('python3', [path.join(__dirname, 'utils/encode_image.py'),
    '--image', imageSrc,
    '--save_dir', path.join(__dirname, `public/images/parsed/${username}`),
    '--secret', username
  ]);

  script.stdout.on('data', () => {
    console.log("1")
    resolve()
  });

  script.stderr.on('data', (e) => {
    console.log(e.toString())
    reject();
  });

  script.on('close', () => {
    console.log("3")
    resolve()
  });
}

// Image Encoder
const encodeImage = async (imageSrc, username, folderExists = false) => {
  return new Promise((resolve, reject) => {
    if (!folderExists) {
      fs.mkdir(`public/images/parsed/${username}`, () => {
        runEncode(imageSrc, username, resolve, reject).catch(() => {})
      })
    } else {
      runEncode(imageSrc, username, resolve, reject).catch(() => {})
    }
  })
}

// Images API
const backendUrl = 'http://128.226.78.38:8000/'
app.get('/api/images', verifyToken, (req, res) => {
  fs.readdir(path.join(__dirname, 'public/images'), async (err, files) => {
    if (err) {
      res.status(500).send('Error reading image folder');
    } else {
      console.log( req.user.id )
      User.findOne({ _id: new ObjectId(req.user) }, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error on the server.');
        }
        if (!user) {
          return res.status(404).send('No user found.');
        }
        const imagePaths = [];
        files.forEach((file) => {
          if (path.extname(file) === '.jpg') {
            const filename = path.parse(file).name;
            imagePaths.push(backendUrl + `api/images/parsed/${user.username}/${filename}_hidden.png`);
          }
        });
        return res.send(imagePaths);
      })
    }
  });
});

app.get('/api/images/parsed/:username/:file', async function(req, res) {
  // read parsed directory to remove users if limit has been overreached
  let folderExists = false
  let fileExists = false
  let removedFolder = false

  try {
    const folders = fs.readdirSync(path.join(__dirname, 'public/images/parsed'))
    for (let i = 0; i < folders.length; i++) {
      if (folders[i] !== req.params.username) {
        if (!removedFolder && folders.length > ENCODED_USER_LIMIT) {
          removedFolder = true
          fs.rmdir(path.join(__dirname, `public/images/parsed/${req.params.username}`), () => {})
        }
      } else {
        folderExists = true
      }
    }
  } catch {}


  if (folderExists) {
    try {
      const files = fs.readdirSync(path.join(__dirname, `public/images/parsed/${req.params.username}`))
      for (let i = 0; i < files.length; i++) {
        if (files[i] === req.params.file) {
          fileExists = true
          break;
        }
      }
    } catch {}
  }

  if (!fileExists) {
    await encodeImage(
      path.join(__dirname, `public/images/${req.params.file.replace('_hidden.png', '.jpg')}`),
      req.params.username,
      folderExists
    )
      .catch(() => {})
  }

  fs.readFile(path.join(__dirname, `public/images/parsed/${req.params.username}/${req.params.file}`), (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(data);
  });
});
