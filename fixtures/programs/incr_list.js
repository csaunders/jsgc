(function(){
  function incrList(list){
    return list.map(function(e){
      return e + 1;
    });
  };
  Fixtures.incrList = {
    program: incrList,
    ast: esprima.parse(""+incrList)
  };
})();
