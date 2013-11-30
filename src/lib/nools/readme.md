[![Build Status](https://travis-ci.org/C2FO/nools.png)](https://travis-ci.org/C2FO/nools)

[![browser support](https://ci.testling.com/C2FO/nools.png)](https://ci.testling.com/C2FO/nools)

# Nools

Nools is a [rete](http://en.wikipedia.org/wiki/Rete_algorithm) based rules engine written entirely in javascript.

# Installation

```
npm install nools
```
Or [download the source](https://raw.github.com/C2FO/nools/master/nools.js) ([minified](https://raw.github.com/C2FO/nools/master/nools.min.js))


# Usage

   * Flows
    * [Defining A Flow](#flow) 
    * [Sessions](#session) 
    * [Facts](#facts) 
    * [Firing](#firing) 
    * [Disposing](#disposing)
    * [Removing A Flow](#removing-flow)
    * [Removing All Flows](#removing-flows)
    * [Checking If A Flow Exists](#checking-for-flow)
    * [Agenda Group](#agenda-groups)
      * [Focus](#agenda-groups-focus)
      * [Auto Focus](#agenda-groups-auto-focus)
   * [Defining Rules](#defining-rule)
      * [Structure](#rule-structure)
      * [Salience](#rule-salience)
      * [Scope](#rule-scope)
      * [Constraints](#constraints)
      * [Actions](#action)
      * [Globals](#globals)
      * [Import](#import)
   * [Browser Support](#browser-support)
   * [Fibonacci](#fib)
      
   

The [examples](https://github.com/C2FO/nools/tree/master/examples) and [tests](https://github.com/C2FO/nools/tree/master/test) are a
great place to get started. You can ask your questions on the [Nools Google group](https://groups.google.com/forum/#!forum/nools).

<a name="flow"></a>
## Defining a flow

When using nools you define a **flow** which acts as a container for rules that can later be used to get
a **session**

### Programmatically
```javascript
var nools = require("nools");

var Message = function (message) {
    this.message = message;
};

var flow = nools.flow("Hello World", function (flow) {

    //find any message that start with hello
    flow.rule("Hello", [Message, "m", "m.message =~ /^hello(\\s*world)?$/"], function (facts) {
        facts.m.message = facts.m.message + " goodbye";
        this.modify(facts.m);
    });

    //find all messages then end in goodbye
    flow.rule("Goodbye", [Message, "m", "m.message =~ /.*goodbye$/"], function (facts) {
        console.log(facts.m.message);
    });
});

```

In the above flow definition 2 rules were defined

  * Hello
    * Requires a Message
    * The messages's message must match the regular expression "/^hello(\\s*world)?$/"
    * When matched the message's message is modified and then we let the engine know that we modified the message.
  * Goodbye
    * Requires a Message
    * The messages's message must match the regular expression "/.*goodbye$/"(anything that ends in goodbye)
    * When matched the resulting message is logged.

### DSL

You may also use the `nools` rules language to define your rules.

The following is the equivalent of the rules defined programmatially above.

```
define Message {
    message : '',
    constructor : function(message){
        this.message = message;
    }
}

//find any message that start with hello
rule Hello {
    when {
        m : Message m.message =~ /^hello(\\s*world)?$/;
    }
    then {
        modify(m, function(){this.message += " goodbye";});
    }
}

//find all messages then end in goodbye
rule Goodbye {
    when {
        m : Message m.message =~ /.*goodbye$/;
    }
    then {
        console.log(m.message);
    }
}
```

To use the flow

```javascript
var flow = nools.compile(__dirname + "/helloworld.nools"),
    Message = flow.getDefined("message");
```

### Flow Events

Each flow can have the following events emitted.

* `assert (fact)` - emitted when facts are asserted
* `retract (fact)` - emitted when facts are retracted
* `modify (fact)` - emitted when facts are modified
* `fire (name, rule)` - emitted when an activation is fired.

```
session.on("assert", function(fact){
    //fact was asserted
});

session.on("retract", function(fact){
    //fact was retracted
});

session.on("modify", function(fact){
    //fact was modifed
});

session.on("fire", function(name, rule){
    //a rule was fired.
});
```

### `nools.compile`

The compile method accepts the following parameters

* `source|path` - The first argument must either be a path that ends in `.nools` or a string which is the source of the rules that you wish to compile.
* `options?`
   * `name` : This is the name of the flow. You can use this name to look up the flow by using `nools.getFlow`.
   * `define` : A hash of Classes that should be aviable to the rules that you are compiling.
   * `scope`: A hash of items that should be available to rules as they run. (i.e. a logger)
* `cb?` - an options function to invoke when compiling is done.


**Example**

```
rule "person name is bob" {
    when {
        p : Person p.name == 'bob';
    }
    then {
        logger.info("Found person with name of bob");
        retract(p);
    }
}
```

In the above rules file we make use of a Person class and a logger. In order for nools to properly reference the Class and logger you must specify them in your options.

```javascript
var flow = nools.compile("personFlow.nools", {
    define: {
        //The person class the flow should use
        Person: Person
    },
    scope: {
        //the logger you want your flow to use.
        logger: logger
    }
});
```

You may also compile source directly.

```javascript
var noolsSource = "rule 'person name is bob' {"
    + "   when {"
    + "     p : Person p.name == 'bob';"
    + "   }"
    + "   then {"
    + "       logger.info('Found person with name of bob');"
    + "       retract(p);"
    + "   }"
    + "}";

var flow = nools.compile(noolsSource, {
    define: {
        //The person class the flow should use
        Person: Person
    },
    scope: {
        //the logger you want your flow to use.
        logger: logger
    }
});
```

<a name="session"></a>
## Working with a session

A session is an instance of the flow that contains a working memory and handles the assertion, modification, and retraction of facts from the engine.

To obtain an engine session from the flow invoke the  `getSession` method.

```javascript
var session = flow.getSession();
```

<a name="facts"></a>
## Working with facts

Facts are items that the rules should try to match.


To add facts to the session use **assert** method.

```javascript
session.assert(new Message("hello"));
session.assert(new Message("hello world"));
session.assert(new Message("goodbye"));
```

As a convenience any object passed into **getSession** will also be asserted.

```javascript
flow.getSession(new Message("hello"), new Message("hello world"), new Message("goodbye"));
```

To retract facts from the session use the **retract** method.

```javascript
var m = new Message("hello");

//assert the fact into the engine
session.assert(m);

//remove the fact from the engine
session.retract(m);

```

To modify a fact use the **modify** method.

**Note** modify will not work with immutable objects (i.e. strings). 

```javascript

var m = new Message("hello");

session.assert(m);

m.message = "hello goodbye";

session.modify(m);

```

**assert** is typically used pre engine execution and during the execution of the rules.

**modify** and **retract** are typically used during the execution of the rules.


<a name="firing"></a>
## Firing the rules

When you get a session from a **flow** no rules will be fired until the **match** method is called.

```javascript
var session = flow.getSession();
//assert your different messages
session.assert(new Message("goodbye"));
session.assert(new Message("hello"));
session.assert(new Message("hello world"));

//now fire the rules
session.match(function(err){
    if(err){
        console.error(err);
    }else{
        console.log("done");
    }
})
```

The **match** method also returns a promise that is resolved once there are no more rules to activate.

```javascript
session.match().then(
  function(){
      console.log("Done");
  }, 
  function(err){
    //uh oh an error occurred
    console.error(err);
  });
```

## Fire until halt

You may also run the engine an a "reactive" mode which will continue to match until `halt` is invoked.

In the following example the rules engine continues to evaluate until the counter reaches `10000`. If you remove the "counted to high" rule then the engine would run indefinitely.

```javascript

define Counter {
    count: 0,
    constructor: function(count){
        this.count = count;
    }
}

//We reached our goal
rule "I can count!" {
    when {
        $ctr: Counter $ctr.count == 10000;
    }
    then{
        console.log("Look ma! I counted to " + $ctr.count);
        halt();
    }
}

//no counter was asserted so create one
rule "not count" {
    when {
        not($ctr: Counter);
    }
    then{
        console.log("Imma gonna count!");
        assert(new Counter(1));
    }
}

//A little status update
rule "give them an update" {
    when{
        $ctr: Counter $ctr.count % 1000 == 0 {count: $count}
    }
    then{
        console.log("Imma countin...");
        modify($ctr, function(){this.count = $count + 1;});
    }
}

//just counting away
rule count {
    when{
        $ctr: Counter {count: $count}
    }
    then{
        modify($ctr, function(){this.count = $count + 1;});
    }
}

```

```javascript
flow.getSession().matchUntilHalt(function(err){
    if(err){
        console.log(err.stack);
        return;
    }
    //halt finally invoked
});
```

`matchUntilHalt` also returns a promise.


```javascript
flow.getSession().matchUntilHalt()
    .then(
        function(){
            //all done!
        },
        function(err){
            console.log(err.stack);
        }
    );
```



<a name="disposing"></a>
## Disposing of the session

When working with a lot of facts it is wise to call the `dispose` method which will purge the current session of
all facts, this will help prevent the process from growing a large memory footprint.

```javascript
session.dispose();
```

<a name="removing-flow"></a>
# Removing a flow

To remove a defined flow from `nools` use the `deleteFlow` function.

```javascript
var myFlow = nools.flow("flow");

nools.deleteFlow("flow"); //returns nools for chaining

nools.getFlow("flow"); //undefined

```

You may also remove a flow using the `FlowContainer` object returned from nools.flow;

```javascript
var myFlow = nools.flow("flow");

nools.deleteFlow(myFlow); //returns nools for chaining

nools.getFlow("flow"); //undefined
```

<a name="removing-flows"></a>
# Removing All Flows

To remove all flow from `nools` use the `deleteFlows` function.

```javascript
var myFlow = nools.flow("flow");

nools.deleteFlows(); //returns nools for chaining

nools.getFlow("flow"); //undefined

```


<a name="checking-for-flow"></a>
# Checking If A Flow Exists

To check if a flow currently is registering with `nools` use the `hasFlow` function;

```javascript
var myFlow = nools.flow("flow");

nools.hasFlow("flow"); //true

```

<a name="agenda-groups"></a>
## Agenda Groups

Agenda groups allow for logical groups of rules within a flow.

The agenda manages a `stack` of `agenda-groups` that are currently in focus. The default `agenda-group` is called `main` and all rules that do not have an `agenda-group` specified are placed into the `main` `agenda-group`.

As rules are fired when a particular `agenda-group` runs out of activations then that a `agenda-group` is popped from the internal `agenda-group` stack and the next one comes into focus. This continues until `focus` is explicitly called again or the `main` `agenda-group` comes into focus.

**Note** Once an agenda group loses focus it must be re-added to the stack in order for those activations to be focused again.

To add a rule to an agenda-group you can use the `agendaGroup` option.

```javascript
this.rule("Hello World", {agendaGroup: "ag1"}, [Message, "m", "m.name == 'hello'"], function (facts) {
    this.modify(facts.m, function () {
        this.name = "goodbye";
    });
});

this.rule("Hello World2", {agendaGroup: "ag2"}, [Message, "m", "m.name == 'hello'"], function (facts) {
    this.modify(facts.m, function () {
        this.name = "goodbye";
    });
});
```

Or in the dsl

```
rule "Hello World" {
    agenda-group: "ag1";
    when{
        m : Message m.name == 'hello';
    }
    then{
        modify(m, function(){
            this.name = "goodbye"
        });
    }
}

rule "Hello World 2" {
    agenda-group: "ag2";
    when{
        m : Message m.name == 'hello';
    }
    then {
        modify(m, function(){
            this.name = "goodbye"
        });
    }
}
```

In the above rules we have defined two agenda-groups called `ag1` and `ag2`

<a name="agenda-groups-focus"></a>
### Focus

When running your rules and you want a particular agenda group to run you must call `focus` on the flow and specify the `agenda-group` to add to the stack.

```
//assuming a flow with the rules specified above.
var fired = [];
flow
   .focus("ag1")
   .on("fire", function(ruleName){
      fired.push(ruleName); //[ 'Hello World' ]
   })
   .assert(new Message("hello"))
   .match(function(){
        console.log(fired);
   });
```

Or you can add multiple focuses to the stack

```javascript
var fired = [], fired2 = [];
flow
    .getSession(new Message("hello"))
    .focus("ag2")
    .focus("ag1")
    .on("fire", function (ruleName) {
       fired.push(ruleName);
    })
    .match(function () {
        console.log(fired); //[ 'Hello World', 'Hello World2' ]
    });

flow
    .getSession(new Message("hello"))
    .focus("ag1")
    .focus("ag2")
    .on("fire", function (ruleName) {
       fired2.push(ruleName);
    })
    .match(function () {
        console.log(fired2); //[ 'Hello World2', 'Hello World' ]
    });
```

Notice above that the last `agenda-group` focused is added to the array first.

<a name="agenda-groups-auto-focus"></a>
### Auto Focus

Sometimes you may want an `agenda-group` to `auto-focus` whenever a certain rule is activated.

```
this.rule("Bootstrap", [State, "a", "a.name == 'A' && a.state == 'NOT_RUN'"], function (facts) {
    this.modify(facts.a, function () {
        this.state = 'FINISHED';
    });
});

this.rule("A to B",
    [
        [State, "a", "a.name == 'A' && a.state == 'FINISHED'"],
        [State, "b", "b.name == 'B' && b.state == 'NOT_RUN'"]
    ],
    function (facts) {
        this.modify(facts.b, function () {
            this.state = "FINISHED";
        });
    });

this.rule("B to C",
    {agendaGroup: "B to C", autoFocus: true},
    [
        [State, "b", "b.name == 'B' && b.state == 'FINISHED'"],
        [State, "c", "c.name == 'C' && c.state == 'NOT_RUN'"]
    ],
    function (facts) {
        this.modify(facts.c, function () {
            this.state = 'FINISHED';
        });
        this.focus("B to D");
    });

this.rule("B to D",
    {agendaGroup: "B to D"},
    [
        [State, "b", "b.name == 'B' && b.state == 'FINISHED'"],
        [State, "d", "d.name == 'D' && d.state == 'NOT_RUN'"]
    ],
    function (facts) {
        this.modify(facts.d, function () {
        this.state = 'FINISHED';
    });
});
```

Or using the dsl

```
rule Bootstrap {
    when{
        a : State a.name == 'A' && a.state == 'NOT_RUN';
    }
    then{
        modify(a, function(){
            this.state = 'FINISHED';
        });
    }
}


rule 'A to B' {
    when{
        a : State a.name == 'A' && a.state == 'FINISHED';
        b : State b.name == 'B' && b.state == 'NOT_RUN';
    }
    then{
        modify(b, function(){
            this.state = 'FINISHED';
        });
    }
}

rule 'B to C' {
    agenda-group: 'B to C';
    auto-focus: true;
    when{
        b: State b.name == 'B' && b.state == 'FINISHED';
        c : State c.name == 'C' && c.state == 'NOT_RUN';
    }
    then{
        modify(c, function(){
            this.state = 'FINISHED';
        });
        focus('B to D')
    }
}

rule 'B to D' {
    agenda-group: 'B to D';
    when{
        b: State b.name == 'B' && b.state == 'FINISHED';
        d : State d.name == 'D' && d.state == 'NOT_RUN';
    }
    then{
        modify(d, function(){
            this.state = 'FINISHED';
        });
    }
}
```

In the above rules we created a state machine that has a rule with `auto-focus` set to true.

This allows you to not have to specify `focus` when running the flow.

```javascript
var fired = [];
flow
    .getSession(
        new State("A", "NOT_RUN"),
        new State("B", "NOT_RUN")),
        new State("C", "NOT_RUN")),
        new State("D", "NOT_RUN")
    )
    .on("fire", function (name) {
        fired.push(name);
    })
    .match()
    .then(function () {
        console.log(fired); //["Bootstrap", "A to B", "B to C", "B to D"]
    });
```

<a name="defining-rule"></a>
# Defining rules

<a name="rule structure"></a>
## Rule structure

Lets look at the "Calculate" rule in the [Fibonacci](#fib) example

```javascript
   //flow.rule(type[String|Function], constraints[Array|Array[[]]], action[Function]);
   flow.rule("Calculate", [
         //Type     alias  pattern           store sequence to s1
        [Fibonacci, "f1",  "f1.value != -1", {sequence:"s1"}],
        [Fibonacci, "f2", "f2.value != -1 && f2.sequence == s1 + 1", {sequence:"s2"}],
        [Fibonacci, "f3", "f3.value == -1 && f3.sequence == s2 + 1"],
        [Result, "r"]
    ], function (facts) {
        var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
        var v = f3.value = f1.value + facts.f2.value;
        facts.r.result = v;
        this.modify(f3);
        this.retract(f1);
    });
```

Or using the nools DSL

```
rule Calculate{
    when {
        f1 : Fibonacci f1.value != -1 {sequence:s1};
        f2 : Fibonacci f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
        f3 : Fibonacci f3.value == -1 && f3.sequence == s2 + 1;
    }
    then {
       modify(f3, function(){
            this.value = f1.value + f2.value;
       });
       retract(f1);
    }
}
```

<a name="rule-salience"></a>
### Salience

Salience is an option that can be specified on a rule giving it a priority and allowing the developer some control over conflict resolution of activations.

```javascript
this.rule("Hello4", {salience: 7}, [Message, "m", "m.name == 'Hello'"], function (facts) {
});

this.rule("Hello3", {salience: 8}, [Message, "m", "m.name == 'Hello'"], function (facts) {
});

this.rule("Hello2", {salience: 9}, [Message, "m", "m.name == 'Hello'"], function (facts) {
});

this.rule("Hello1", {salience: 10}, [Message, "m", "m.name == 'Hello'"], function (facts) {
});
```

In the above flow we define four rules each with a different salience, when a single message is asserted they will fire in order of salience (highest to lowest).

```javascript
var fired = [];
flow1
    .getSession(new Message("Hello"))
    .on("fire", function (name) {
        fired.push(name);
    })
    .match()
    .then(function(){
        console.log(fired); //["Hello1", "Hello2", "Hello3", "Hello4"]
    });
```



<a name="rule-scope"></a>
### Scope

Scope allows you to access function from within your rules.

If you are using vanilla JS you can use the `scope` option when defining your rule.

```javascript

this.rule("hello rule", {scope: {isEqualTo: isEqualTo}},
   [
      ["or",
         [String, "s", "isEqualTo(s, 'hello')"],
         [String, "s", "isEqualTo(s, 'world')"]
      ],
      [Count, "called", null]
   ],
   function (facts) {
      facts.called.called++;
   });


```

If you are using the dsl.

```
function matches(str, regex){
    return regex.test(str);
}

rule Hello {
    when {
        m : Message matches(m.message, /^hello(\\s*world)?$/);
    }
    then {
        modify(m, function(){
            this.message += " goodbye";
        })
    }
}

rule Goodbye {
    when {
        m : Message matches(m.message, /.*goodbye$/);
    }
    then {
    }
}
```

Or you can pass in a custom function using the scope option in compile.

```
rule Hello {
    when {
        m : Message doesMatch(m.message, /^hello(\\s*world)?$/);
    }
    then {
        modify(m, function(){
            this.message += " goodbye";
        })
    }
}

rule Goodbye {
    when {
        m : Message doesMatch(m.message, /.*goodbye$/);
    }
    then {
    }
}
```

Provided the `doesMatch` function in the scope option of compile.

```javascript
function matches(str, regex) {
   return regex.test(str);
};
var flow = nools.compile(__dirname + "/rules/provided-scope.nools", {scope: {doesMatch: matches}});
```

<a name="constraints"></a>
### Constraints

Constraints define what facts the rule should match. The constraint is a array of either a single constraint (i.e. Bootstrap rule) or an array of constraints(i.e. Calculate).

Programmatically

```javascript
[
   //Type     alias  pattern           store sequence to s1
  [Fibonacci, "f1", "f1.value != -1", {sequence:"s1"}],
  [Fibonacci, "f2", "f2.value != -1 && f2.sequence == s1 + 1", {sequence:"s2"}],
  [Fibonacci, "f3", "f3.value == -1 && f3.sequence == s2 + 1"],
  [Result, "r"]
]
```

Using nools DSL

```
when {
    f1 : Fibonacci f1.value != -1 {sequence:s1};
    f2 : Fibonacci f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
    f3 : Fibonacci f3.value == -1 && f3.sequence == s2 + 1;
}
```

   1. Type -  is the Object type the rule should match. The available types are
      * `String` - "string", "String", String
      * `Number` - "number", "Number", Number
      * `Boolean` - "boolean", "Boolean", Boolean
      * `Date` - "date", "Date", Date
      * `RegExp` - "regexp", "RegExp", RegExp
      * `Array` - "array", "Array", [], Array
      * `Object` - "object", "Object", "hash", Object
      * Custom - any custom type that you define
   2. Alias - the name the object should be represented as.
   3. Pattern(optional) - The pattern that should evaluate to a boolean, the alias that was used should be used to reference the object in the pattern. Strings should be in single quotes, regular expressions are allowed. Any previously define alias/reference can be used within the pattern. Available operators are.
      * `&&`, `AND`, `and`
      * `||`, `OR`, `or`
      * `>`, `<`, `>=`, `<=`, `gt`, `lt`, `gte`, `lte`
      * `==`, `!=`, `=~`, `!=~`, `eq`, `neq`, `like`, `notLike`
      * `+`, `-`, `*`, `/`, `%`
      * `-` (unary minus)
      * `.` (member operator)
      * `in` (check inclusion in an array)
      * `notIn` (check that something is not in an array)
      * Defined helper functions
        * `now` - the current date
        * `Date(year?, month?, day?, hour?, minute?, second?, ms?)` - creates a new `Date` object
        * `lengthOf(arr, length)` - checks the length of an array
        * `isTrue(something)` - check if something === true         
        * `isFalse(something)` - check if something === false
        * `isRegExp(something)` - check if something is a `RegExp`
        * `isArray(something)` - check if something is an `Array`                                
        * `isNumber(something)` - check if something is an `Number`
        * `isHash(something)` - check if something is strictly an `Object`
        * `isObject(something)` - check if something is any type of `Object`
        * `isDate(something)` - check if something is a `Date`
        * `isBoolean(something)` - check if something is a `Boolean`
        * `isString(something)` - check if something is a `String`
        * `isUndefined(something)` - check if something is a `undefined`
        * `isDefined(something)` - check if something is `Defined`
        * `isUndefinedOrNull(something)` - check if something is a `undefined` or `null`
        * `isPromiseLike(something)` - check if something is a "promise" like (containing `then`, `addCallback`, `addErrback`)
        * `isFunction(something)` - check if something is a `Function`
        * `isNull(something)` - check if something is `null`
        * `isNotNull(something)` - check if something is not null
        * `dateCmp(dt1, dt2)` - compares two dates return 1, -1, or 0
        * `years|months|days|hours|minutes|seconds``Ago`/`FromNow``(interval)` - adds/subtracts the date unit from the current time 
        
   4. Reference(optional) - An object where the keys are properties on the current object, and values are aliases to use. The alias may be used in succeeding patterns.

<a name="action"></a>

### Action

The action is a function that should be fired when all patterns in the rule match. The action is called in the scope
of the engine so you can use `this` to `assert`, `modify`, or `retract` facts. An object containing all facts and
references created by the alpha nodes is passed in as the first argument to the action.

So calculate's action modifies f3 by adding the value of f1 and f2 together and modifies f3 and retracts f1.

```javascript
function (facts) {
        var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
        var v = f3.value = f1.value + facts.f2.value;
        facts.r.result = v;
        this.modify(f3);
        this.retract(f1);
    }
```

The session is also passed in as a second argument so alternatively you could do the following.

```javascript
function (facts, session) {
        var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
        var v = f3.value = f1.value + facts.f2.value;
        facts.r.result = v;
        session.modify(f3);
        session.retract(f1);
    }
```

If you have an async action that needs to take place an optional third argument can be passed in which is a function 
to be called when the action is completed.

```javascript
function (facts, engine, next) {
        //some async action
        process.nextTick(function(){
            var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
            var v = f3.value = f1.value + facts.f2.value;
            facts.r.result = v;
            engine.modify(f3);
            engine.retract(f1);
            next();
        })
    }
```
If any arguments are passed into next it is assumed there was an error and the session will error out.

To define the action with the nools DSL

```
then {
    modify(f3, function(){
        this.value = f1.value + f2.value;
    });
    retract(f1);
}
```

For rules defined using the rules language nools will automatically determine what parameters need to be passed in based on what is referenced in the action.

<a name="globals"></a>

### Globals

Globals are accessible through the current working scope of rules defined in a `dsl`, very similar to using the `scope` option when compiling.

**Note**  `globals` are not part of the working memory and therefore are not accessible in the LHS (when) or your rule.

Globals are used like the following:

```
global PI = Math.PI;
global SOME_STRING = 'some string';
global TRUE = true;
global NUM = 1.23;
global DATE = new Date();

rule "A Rule" {
    when {
    	$obj: Object;
    }
    then{
    	console.log(PI); //Math.PI;
    	console.log(SOME_STRING); //"some string"
    	console.log(TRUE); //true
    	console.log(NUM); //1.23
    	console.log(DATE); //Thu May 23 2013 15:49:22 GMT-0500 (CDT)
    }
}
```

If you are using `nools` in `node` you can also use a require statement.

**NOTE** require does not currently work for relative paths.

```
global util = require("util");

rule "A Rule" {
    when {
    	$obj: Object;
    }
    then{
    	util.log("HELLO WORLD");
    }
}
```

<a name="import"></a>

### Importing

The `import` statement allows you to import other `nools` files into the current one. This can be used to split up logical flows into small reusable groups of rules.

Define our common model to be used across our flows.

```
//define.nools
define Count{
    constructor: function(){
        this.called = 0;
    }
}
```

Create a rules file which imports the `define.nools` to define our `Count` model.

```
//orRule.nools

//import define.nools
import("./define.nools");
rule orRule {
    when {
        or(
            s : String s == 'hello',
            s : String s == 'world'
        );
        count : Count;
    }
    then {
        count.called++;
        count.s = s;
    }
}
```

Same as `orRule.nools` import our `define.nools`

```
//notRule.nools
import("./defines.nools");
rule notRule {
    when {
        not(s : String s == 'hello');
        count : Count
    }
    then {
        count.called++;
    }
}
```

Now we can use `orRule.nools` and `notRule.nools` to compose a new flow that contains `define.nools`, `orRule.nools` and `notRule.nools`.


**Note** `nools` will handle duplicate imports, in this case `define.nools` will only be imported once.

```
//import
import("./orRules.nools");
import("./notRules.nools");
```


## Emitting custom events.

You may also emit events from your rule actions using the sessions emit function.

```
then {
    modify(f3, function(){
        this.value = f1.value + f2.value;
    });
    retract(f1);
    emit("my custom event");
}
```

To listen to the event just use the on method of the session.

```
var session = flow.getSession();

session.on("my custom event", function(){
    //custom event called.
});

```

# Browser Support

<a name="browser-support"></a>

`Nools` can also be used in the browser. The only difference is that you cannot pass a file location to the compile method instead you must provide the source.

Nools is compatible with amd(requirejs) and can also be used in a standard script tag.

### Example 1.

In this example we compile rules definitions inlined in a script tag.

```html
<script type="text/javascript" src="nools.js"></script>
<script type="text/nools" id="simple">
define Message {
    message : "",
    constructor : function (message) {
        this.message = message;
    }
}

rule Hello {
    when {
        m : Message m.message =~ /^hello(\\s*world)?$/
    }
    then {
        modify(m, function(){
            this.message += " goodbye";
        });
    }
}

rule Goodbye {
    when {
        m : Message m.message =~ /.*goodbye$/
    }
    then {
        document.getElementById("output").innerHTML += m.message + "</br>";
    }
}
</script>
<script type="text/javascript">
    function init() {
       //get the source
       var source = document.getElementById("simple").innerHTML;
       //compile the source. The name option is required if compiling directly.
       var flow = nools.compile(source, {name: "simple"}),
                Message = flow.getDefined("message"),
                session = flow.getSession();
        //assert your different messages
        session.assert(new Message("goodbye"));
        session.assert(new Message("hello"));
        session.assert(new Message("hello world"));
        session.match();
    }
</script>
```

### Using a compiled dsl.

You may also use the `nools` executable to compile source into a browser friendly format skipping the need for compiling each time.

```
nools compile ./my/rules.nools > ./compiled.js
```

To use the flow require the compile version either through a script tag, `amd/requirejs`, or `commonjs` require.

If you import the flow using a script tag you can get a reference to the flow by using `nools.getFlow`.

```
nools.getFlow("rules");
```

You may also specify the name of the flow when compiling, it defaults to the name of the nools file less ".nools"

```
nools compile -n "my rules" ./my/rules.nools
```

```
nools.getFlow("my rules");
```

If you are using requirejs or nools must be required using something other than `require("nools")` then you can specify a location of the nools source.

```
nools compile -nl "./location/to/nools" ./my/rules.nools
```

### RequireJS examples

Examples of using nools with require js are located in the [examples directory](./examples).



# Examples

<a name="fib"></a>
## Fibonacci

```javascript
"use strict";

var nools = require("nools");

var Fibonacci = function (sequence, value) {
    this.sequence = sequence;
    this.value = value || -1;
};

var Result = function (result) {
    this.result = result || -1;
};


var flow = nools.flow("Fibonacci Flow", function (flow) {

    flow.rule("Recurse", [
        ["not", Fibonacci, "f", "f.sequence == 1"],
        [Fibonacci, "f1", "f1.sequence != 1"]
    ], function (facts) {
        var f2 = new Fibonacci(facts.f1.sequence - 1);
        this.assert(f2);
    });

    flow.rule("Bootstrap", [
          Fibonacci, "f", "f.value == -1 && (f.sequence == 1 || f.sequence == 2)"
    ], function (facts) {
        var f = facts.f;
        f.value = 1;
        this.modify(f);
    });

    flow.rule("Calculate", [
        [Fibonacci, "f1", "f1.value != -1", {sequence:"s1"}],
        [Fibonacci, "f2", "f2.value != -1 && f2.sequence == s1 + 1", {sequence:"s2"}],
        [Fibonacci, "f3", "f3.value == -1 && f3.sequence == s2 + 1"],
        [Result, "r"]
    ], function (facts) {
        var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
        var v = f3.value = f1.value + facts.f2.value;
        facts.r.result = v;
        this.modify(f3);
        this.retract(f1);
    });
});

var r1 = new Result(),
    session1 = flow.getSession(new Fibonacci(10), r1),
    s1 = new Date;
session1.match().then(function () {
    console.log("%d [%dms]", r1.result, new Date - s1);
    session1.dispose();
});

var r2 = new Result(),
    session2 = flow.getSession(new Fibonacci(150), r2),
    s2 = new Date;
session2.match().then(function () {
    console.log("%d [%dms]", r2.result, new Date - s2);
    session2.dispose();
});

var r3 = new Result(),
    session3 = flow.getSession(new Fibonacci(1000), r3),
    s3 = new Date;
session3.match().then(function () {
    console.log("%d [%dms]", r3.result, new Date - s3);
    session3.dispose();
});

```

Output

```
55 [43ms]
9.969216677189305e+30 [383ms]
4.346655768693743e+208 [3580ms]
```

### Fibonacci with nools DSL

```
//Define our object classes, you can
//also declare these outside of the nools
//file by passing them into the compile method
define Fibonacci {
    value:-1,
    sequence:null
}
define Result {
    value : -1
}

rule Recurse {
    when {
        //you can use not or or methods in here
        not(f : Fibonacci f.sequence == 1);
        //f1 is how you can reference the fact else where
        f1 : Fibonacci f1.sequence != 1;
    }
    then {
        assert(new Fibonacci({sequence : f1.sequence - 1}));
    }
}

rule Bootstrap {
   when {
       f : Fibonacci f.value == -1 && (f.sequence == 1 || f.sequence == 2);
   }
   then{
       modify(f, function(){
           this.value = 1;
       });
   }
}

rule Calculate {
    when {
        f1 : Fibonacci f1.value != -1 {sequence : s1};
        //here we define constraints along with a hash so you can reference sequence
        //as s2 else where
        f2 : Fibonacci f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
        f3 : Fibonacci f3.value == -1 && f3.sequence == s2 + 1;
        r : Result
    }
    then {
        modify(f3, function(){
            this.value = r.result = f1.value + f2.value;
        });
        retract(f1);
    }
}

```

And to run

```javascript
var flow = nools.compile(__dirname + "/fibonacci.nools");

var Fibonacci = flow.getDefined("fibonacci"), Result = flow.getDefined("result");
var r1 = new Result(),
    session1 = flow.getSession(new Fibonacci({sequence:10}), r1),
    s1 = +(new Date());
session1.match().then(function () {
    console.log("%d [%dms]", r1.result, +(new Date()) - s1);
    session1.dispose();
});

var r2 = new Result(),
    session2 = flow.getSession(new Fibonacci({sequence:150}), r2),
    s2 = +(new Date());
session2.match().then(function () {
    console.log("%d [%dms]", r2.result, +(new Date()) - s2);
    session2.dispose();
});

var r3 = new Result(),
    session3 = flow.getSession(new Fibonacci({sequence:1000}), r3),
    s3 = +(new Date());
session3.match().then(function () {
    console.log("%d [%dms]", r3.result, +(new Date()) - s3);
    session3.dispose();
});

```

License
-------

MIT <https://github.com/C2FO/nools/raw/master/LICENSE>

Meta
----

* Code: `git clone git://github.com/C2FO/nools.git`
