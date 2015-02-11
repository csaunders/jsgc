# JSGC - JavaScript Garbage Collectors

I'm interested in seeing what can be done in JavaScript such that people can build Garbage Collectors in client-side JavaScript. The goal is to make it such that the user's mutators can be written in plain JavaScript though have all of the allocations tracked on a heap managed by their own Garbage Collector.

This is taking the ideas from [`plai/collector`](http://docs.racket-lang.org/plai/collector.html) and the research paper ["Teaching Garbage Collection without Implementing Compilers or Interpreters"](http://cs.brown.edu/~sk/Publications/Papers/Published/cgkmf-teach-gc/) by Krishnamurthi et al. and trying to apply them in JavaScript.

## Obstacles

**Can we override primitives such as `new`, `{}`, and `[]`?**

Unlike Scheme these functions are baked into the language, so overriding them becomes a bit more work. Plai/collector was able to achieve what it has done by using macros to wrap all allocations within calls to the provided garbage collector. In order to achieve the same thing I'm going to attempt to use [Esprima](http://esprima.org/) to deconstruct a program into it's [Abstract Syntax Tree](http://en.wikipedia.org/wiki/Abstract_syntax_tree).

Once I have the AST, it should just require mapping certain functions over to method calls instead. I'm pretty sure this is easier said than done, but we'll see. Recompiled ASTs can be cached to in order to reduce the amount of time spent on `program` -> `ast` -> `mutated program` transformations.

**How can we visualize the heap?**

The heap visualizer in `plai/collector` is a great tool for seeing a flat representation of your heap, though it would be interesting to also get visualizations of the object graph. Along with providing a flat representation of the heap I also hope to provide something similar to that of [ruby-heap-viz](https://github.com/mattbaker/ruby-heap-viz)
