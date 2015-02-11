var expect = chai.expect;

describe("GCHeap", function(){
  var makeHeap = function(size){ return new GCHeap(size); }

  describe("new", function(){
    it("create a new heap object", function(){
      var fn = function() {new GCHeap(32)};
      expect(fn).to.not.throw(InvalidHeapError);
    })

    it("throws an error if the heap size is invalid", function(){
      var fn = function() {new GCHeap(-1)};
      expect(fn).to.throw(InvalidHeapError);

      var fn = function() {new GCHeap(0)};
      expect(fn).to.throw(InvalidHeapError);
    });
  });

  describe("getSize", function(){
    it("returns the size of the heap", function(){
      expect(makeHeap(5).getSize()).to.equal(5);
    });
  });

  describe("setValue", function(){
    var heap = null
    beforeEach(function(){
      heap = makeHeap(5);
    });

    it("sets the address to that value and returns the address", function(){
      expect(heap.setValue(0, 'hello')).to.equal(0);
    });

    it("raises an error if trying to store an object in the heap", function(){
      var insertion = function(){heap.setValue(0, {})};
      expect(insertion).to.throw(HeapError);
    });

    it("raises an error if trying to store an array in the heap", function(){
      var insertion = function(){heap.setValue(0, [])};
      expect(insertion).to.throw(HeapError);
    })

    it("raises an error if trying to store in an invalid memory location", function(){
      var insertion = function(){heap.setValue(-1, 'something')};
      expect(insertion).to.throw(HeapError);
    });
  });

  describe("getValue", function(){
    it("retrieves the value")
  });

  describe("private methods", function(){
    describe("__heapDump", function(){
      it("returns a copy of the heap in it's current state", function(){
        heap = makeHeap(5)
        snapshot = heap.__heapDump()
        expect(snapshot).to.deep.equal([null, null, null, null, null]);
        heap.setValue(0, 'hello');
        expect(heap.__heapDump()).to.deep.equal(['hello', null, null, null, null]);
        expect(heap.__heapDump()).to.deep.not.equal(snapshot);
      });
    });

    describe("__verifyAddress", function(){
      it("does nothing if the address is within range");

      it("raises an error if the address is less than 0");

      it("raises an error if the address is larger than the heap size");
    });

    describe("__verifyDataType", function(){
      it("does nothing if the data is a string");

      it("does nothing if the data is a number");

      it("does nothing if the data is null");

      it("raises an error if the data is an object");

      it("raises an error if the data is an array");
    });

    describe("__setHeap", function(){
      it("allows the heap to have it's state explicitly set", function(){
        heap = makeHeap(5);
        contents = [1, 'hello', null, null, 'world'];
        heap.__setHeap(contents);
        expect(heap.__heapDump()).to.deep.equal(contents);
      });

      it("does not allow replacement heaps to contain objects or arrays", function(){
        heap = makeHeap(5);
        contents = [1, 'hello', {}, [], null];
        var setHeap = function(){heap.__setHeap(contents)};
        expect(setHeap).to.throw(HeapError);
      });
    })
  });

});
