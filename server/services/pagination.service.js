
/**
 * Size – How many records per page
    Page No – the number of the page
 *
    page 1 : so no skip

    Skip = size * (page number -1)
    Limit = size

 */



let pagination = (req,res) => {
  // 
  // let pageNo = Number(req.body.page ? req.body.page : 1);
  // let limit = Number(req.body.limit ? Number(req.body.limit) : 10);
  // let keyword= String(req.body.keyword ? String(req.body.keyword) : "");

    let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);
    let  query = {};

    query.skip = size * (pageNo - 1);
    query.limit = size;

    (pageNo < 0 || pageNo === 0) ? Promise.reject('invalid page number, should start with 1') : (0);

    return query;
}

module.exports = {pagination};
