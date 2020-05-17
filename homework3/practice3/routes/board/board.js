var express = require('express');
var router = express.Router();
const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const Board = require('../../model/post');

//게시물 전체 조회
router.get('/',(req,res)=>{
  Board.getAllBoard()
  .then(({code,json}) => {
      res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.NOT_FOUND)
      .send(utils.fail(statusCode.NOT_FOUND,resMessage.REGIST_ALL_FAIL))
  });
});

//게시물 한 개 조회
router.get('/:board_idx',(req,res)=>{
  const {board_idx} = req.params;

  Board.getBoard(board_idx)
  .then(({code,json}) => {
      res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR))
  });
});

//게시물 등록
router.post('/',(req,res)=>{
  const userId ='meohyun2';
  const boardString = 'Dummy data for Create API';
  Board.newBoard(userId,boardString)
  .then(({code,json})=> {
      res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.NOT_FOUND)
      .send(utils.fail(statusCode.NOT_FOUND,resMessage.POST_FAIL));
  });
});

//게시물 수정
router.put('/:board_idx',(req,res)=>{
  const {board_idx} = req.params;
  const newBoardString = 'update board data';
  Board.updateBoard(board_idx,newBoardString)
  .then(({code,json})=>{
      res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  });
});

//게시물 삭제
router.delete('/:board_idx',(req,res)=>{
  const {board_idx} = req.params;
  Board.deleteBoard(board_idx)
  .then(({code,json})=>{
      res.status(code).send(json);
  })
  .catch((err)=>{
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
  });
});
module.exports = router;