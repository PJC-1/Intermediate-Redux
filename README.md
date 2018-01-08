



Intermediate Redux: Middleware
===================
> Following **StephenGrider**'s tutorial: *Modern React with Redux* on udemy, here's the [link](https://www.udemy.com/react-redux/).
> Bellow are a mix of notes from the tutorial, react documentation, and other sources.

Helpful Links
-------------
----------
>  
> [redux-promise](https://www.npmjs.com/package/redux-promise) is used to help us handle ajax request inside our application.
>


----------

Container or Component
-------------
----------
>
> Here is a helpful [article](http://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/) by Sophie DeBenedetto that explains *container*/*component* pattern in **React**.
>
> **Container**
>  
>  A *container component* is a component that is responsible for retrieving data, and in order to get that data, the component needs to use *Redux's* ```connect``` and ```mapStateToProps``` functions.
>   
> A *container component* will grab data from state via ```mapStateToProps```. The component will then pass necessary portions of that data down to its children as ```props```.
>  
> A *container component* is also responsible for dispatching *actions* that make changes to *application state*.
>  
> **Component (Presentational Component)**
>
> A *presentational component* simply receives that data from its parent container and displays it.
>
> **Callback Functions as Props**
>
> A function can be defined in a *container component* that dispatches an action. Such a function will be passed as *prop* to a child (*presentational component*), and triggered via a *callback*, in response to a users' interaction.
>  
>

----------


Redux
-------------
> In **Redux**, just like *react*, you **never** manipulate *state* directly, but by calling ```setState()``` instead.
>
> example:
>  
```
// WRONG
    return state.push(action.payload.data);
```
>
```
// RIGHT
    return state.concat([action.payload.data]);
```
> Using ```.concat()``` works because we are return a new version of our state, rather than mutating our state inline.  
>


----------

Redux-Promise
-------------
> **Redux Promise** will stop the action's payload, if the payload property is a **promise**, it will stop the action entirely and once the request finishes it dispatches a new action of the same type but with a payload of the resolved request. In other words, *redux-promise* will unwrap the promise.

----------


.bind(this)
-------------
>
> General rule of thumb with *this*, if you're ever passing a callback around as a function. Where the callback has a reference to **this**,  YOU WILL NEED TO **BIND** IT WITH THE CONTEXT.
>  
```
//Example

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <form className="input-group">
        <input
          placeholder="Get a five-day forecast in your favorite cities"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}
```
>
> From the code-snippet above, when the ```onChange``` event is triggered, and the ```this.onInputChange``` callback is fired, in the line ```this.setState({ term: event.target.value });``` from the callback, the *this* does **not** have the correct context of *this*. It has the *incorrect* context of *this* because it is not the actual component, so no ```setState()``` method exist on ```this```. The following error message will be output to the dev console when the ```this.onInputChange``` is fired.
>  
```
//from the dev-console
bundle.js: Uncaught TypeError: Cannot read property 'setState' of undefined
```
>
> To correct this, we need to use ```.bind(this)``` in the component's constructor.
>
```
//from the SearchBar Component

  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
  }
```
>
> ```this.onInputChange = this.onInputChange.bind(this);``` means that ```this``` in ```this.onInputChange``` refers to the instance of ```SearchBar```, has a function called ```onInputChange```, ```bind``` this function to ```this``` (from ```bind(this)```), which refers to ```SearchBar``` and replace ```onInputChange``` with a new *bound* instance of this function. Essentially, ```bind(this)``` will override the existing function with a new instance of the same function that is bound with the correct context of *this*.
>
> Here is a link to an article about [React Binding Patterns](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)

----------

react tips
-------------
>
> **Component Design**
>  
>  When building in React, it is really helpful to do extensive wire framing. To go over the overall structure of the components in your React application.
> It is good practice to organize the different distinct areas that will respond well to componentization and can be broken down distinct parts.
>
> **Controlled Field**
>    
>   A *controlled field* is a *form element* where the value of the *input* is set by the *state* of the *component*, and **not** the other way around.
>   For example, if someone clicks on the *Submit* button, it doesn't check for what is the current value in the *input* at that moment. Instead, it will set declaratively what the value of the *input* is (*i.e.* ```this.state.example```). *Not* imperatively.
>   In this tutorial, to create a *controlled component*, you need to set the *state* when ever there is a change to the input. In this context, *state* refers to the *component's state* rather than the *application state*.
>   

----------

> In general when you need to obtain any type of user input it can be a good idea to using a **form tag**.
>   
> It can help you avoid having to define additional events to handle summiting the user input.
>
> *Remember*, you will always need to **preventDefault()** when using the **form tag**
>
> When you find yourself repeating mark-up, it is most likely a good opportunity to refactor the code into a separate component. To make your code reusable.
>  
```
// instead of repeating mark-up like this
      <tr key={name}>
        <td>{name}</td>
        <td>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
          <Sparklines height={120} width={180} data={temps}>
            <SparklinesLine color="red" />
          </Sparklines>
        </td>
      </tr>
```
>
>
```
// you can put that Sparklines code into its own separate component

      <tr key={name}>
        <td>{name}</td>
        <td>
          <Chart data={temps} color="orange" />
        </td>
      </tr>

```
