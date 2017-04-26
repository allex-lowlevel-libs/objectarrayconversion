
function _toHash (obj, field, index) {
  obj.ret[field] = obj.arry[index];
}

function arryToHash (fieldslist, arry) {
  if (!fieldslist) throw new Error('fieldslist missing');
  var ret = {}, tohashobj;
  if (!arry || !arry.length) return ret;
  tohashobj = {ret: ret, arry: arry}; 

  fieldslist.forEach (_toHash.bind(null, tohashobj));
  return ret;
}

function arryOfarrysToArryOfHashes (arry, fieldslist){
  var ret = arry.map(arryToHash.bind(null, fieldslist));
  fieldslist = null;
  return ret;
}

function _dopush (obj, key) {
  obj.ret.push (obj.hash[key]);
}

function hashToArray (fieldslist, hash) {
  var ret = [], dopushobj;
  if (!fieldslist || !fieldslist.length) return ret;
  dopushobj = {ret: ret, hash: hash};
  fieldslist.forEach (_dopush.bind(null, dopushobj));
  dopushobj.ret = null;
  dopushobj.hash = null;
  dopushobj = null;
  return ret;
}

function _toPlainArry (obj, hash) {
  Array.prototype.push.apply(obj.ret,hashToArray(obj.fieldslist, hash));
}

function hashArryToPlainArry (hasharry, fieldslist){
  var ret = [], toplainarryobj = {ret: ret, fieldslist: fieldslist};
  hasharry.forEach(_toPlainArry.bind(null, toplainarryobj));
  toplainarryobj.ret = null;
  toplainarryobj.fieldslist = null;
  toplainarryobj = null;
  return ret;
}

function extract (extractobj, index, ret_index) {
  if (index < 0 || index >= extractobj.data_arry.length) throw new Error('Out of range');
  var itm = extractobj.data_arry[index];
  if (extractobj.ret) {
    extractobj.ret[ret_index] = itm;
  }
  //TODO: dovedi ovo u red: isFunction
  if (extractobj.cb) {
    extractobj.cb(itm);
  }
}

function arryReduce (indices, arry, cb) {
  var ret = new Array(indices.length), extractobj = {ret: ret, data_arry: arry, cb: cb};
  indices.forEach (extract.bind(null, extractobj));
  extractobj.ret = null;
  extractobj.data_arry = null;
  extractobj.cb = null;
  extractobj = null;
  return ret;
};

module.exports = {
  arryToHash: arryToHash,
  arryOfarrysToArryOfHashes: arryOfarrysToArryOfHashes,
  hashArryToPlainArry: hashArryToPlainArry,
  hashToArray: hashToArray,
  arryReduce : arryReduce
}

