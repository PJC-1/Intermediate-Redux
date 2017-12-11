



Intermediate Redux: Middleware
===================
> Following **StephenGrider**'s tutorial: *Modern React with Redux* on udemy, here's the [link](https://www.udemy.com/react-redux/).
> Bellow are a mix of notes from the tutorial, react documentation, and other sources.

.bind(this)
-------------
----------

> **Helpful Links**
>  
> [redux-promise](https://www.npmjs.com/package/redux-promise) is used to help us handle ajax request inside our application.
>


----------

Redux-Promise
-------------
> **Redux Promise** will stop the action's payload, if the payload property is a **promise**, it will stop the action entirely and once the request finishes it dispatches a new action of the same type but with a payload of the resolved request. In other words, *redux-promise* will unwrap the promise.

----------


.bind(this)
-------------
>
-	General rule of thumb with *this*, if you're ever passing a callback around as a function. Where the callback has a reference to **this**,  YOU WILL NEED TO **BIND** IT WITH THE CONTEXT.
-	Here is a link to an article about [React Binding Patterns](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)

----------

react tips
-------------
> In general when you need to obtain any type of user input it can be a good idea to using a **form tag**.
>   
> It can help you avoid having to define additional events to handle summiting the user input.
>
> *Remember*, you will always need to **preventDefault()** when using the **form tag**
