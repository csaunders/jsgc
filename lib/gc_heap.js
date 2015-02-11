function InvalidHeapError() {
  TypeError.call(this);
}
InvalidHeapError.prototype = Object.create(TypeError.prototype);

function HeapError() {
  TypeError.call(this);
}
HeapError.prototype = Object.create(TypeError.prototype);

function GCHeap(size){
  if(size <= 0) {
    throw new InvalidHeapError("Heap Size must be greater than 0");
  }
  this.__heap = new Array(size);
}

GCHeap.prototype.getSize = function(){
  return this.__heap.length;
}

GCHeap.prototype.setValue = function(addr, value){
  this.__verifyAddress(addr);
  this.__verifyDataType(value);
  this.__heap[addr] = value;
  return addr
}

// Private APIs

GCHeap.prototype.__heapDump = function(){
  dump = JSON.stringify(this.__heap);
  return JSON.parse(dump);
}

GCHeap.prototype.__setHeap = function(newHeapAry){
  this.__heap = new Array(newHeapAry.length);
  for(i in newHeapAry) {
    this.setValue(i, newHeapAry[i]);
  }
}

GCHeap.prototype.__verifyAddress = function(addr) {
  if(addr < 0 || addr > this.getSize()){
    throw new HeapError(addr + "is not a valid address for a heap of size" + this.getSize());
  }
}

GCHeap.prototype.__verifyDataType = function(data) {
  if(data != null && typeof(data) == "object") {
    throw new HeapError("'" + JSON.stringify + "' is not a valid heap object");
  }
}
