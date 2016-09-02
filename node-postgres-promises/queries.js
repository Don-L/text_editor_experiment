const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/text_editor_db';
const db = pgp(connectionString);

function getAllText(req, res, next) {
  db.any('select * from text')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all text'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//can't vouch for all the following code working in its current form - some debugging may be required

// function getSingleItem(req, res, next) {
//   let itemID = parseInt(req.params.id);
//   db.one('select * from table_name where id = $1', itemID)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved one item'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function createItem(req, res, next) {
//   req.body.sample_column = parseInt(req.body.sample_column);
//   db.none('insert into table_name (sample_column)' +
//       `values(${req.body.sample_column})`,
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted item'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function removeItem(req, res, next) {
//   let itemID = parseInt(req.params.id);
//   db.result('delete from table_name where id = $1', itemID)
//     .then(function (result) {
//       /* jshint ignore:start */
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} item`
//         });
//       /* jshint ignore:end */
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function updateText(req, res, next) {
  console.log('put attempt');
  console.log(req.body.the_text);
  db.none(`update text set the_text=$1 where id=$2`,
    [req.body.the_text, 1])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated item'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}




module.exports = {
  getAllText: getAllText,
  // getSingleItem: getSingleItem,
  // createItem: createItem,
  updateText: updateText
  // removeItem: removeItem
};
