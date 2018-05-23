'use strict';
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let JSONData = JSON.parse(fs.readFileSync('./data/challenge.json', 'utf8'));

router.post('/projectData', (req, res) => {
});

router.get('/projectData', (req, res) => {
  res.send(JSONData);
});

router.get('/projectData/:id', (req, res, next) => {
  let id = Number(req.params.id);
  let projects = JSONData.projects;
  if( Number(id) > Number(projects[projects.length-1].id) ){
    res.send([projects[0]] ) //Return first
  } else if ( Number(id) < Number(projects[0].id) ){
    res.send([projects[projects.length-1]]) //return last
  } else {
    let filtered = projects.filter((project)=> {
      return project.id === id ;
    })
    res.send(filtered);
  }
});

router.delete('/projectData/:id', (req, res) => {
  //Delete user clicked symbol.
  // let JSONData = JSON.parse(fs.readFileSync('../../data/challenge.json', 'utf8'));

  // fs.writeFile('../../data/challenge.json', JSON.stringify(JSONData, null, 2), 'utf-8', (err) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //      res.sendStatus(200);
  //   }
  // });
})

module.exports = router;



