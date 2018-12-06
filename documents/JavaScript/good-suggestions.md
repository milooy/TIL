# Javascript: Archiving good suggestions

## Pass actions with props
Do you know how to move actions to connect ?

If they are pre-lifted ( 🙅let's try to avoid that in the future )

like this
```
connect(
  mapStateToProps,
  () => ({ // mapActionsToProps function
    onEnterRoute: preLiftedActions.enterRoute,
  })
)
```
if they are not pre-lifted, meaning they need dispatch function injected (🙆 we should try that as much as possible, it makes our components pure)
```
connect(
  mapStateToProps,
  { // mapActionsToProps object
    onEnterRoute: pureActions.enterRoute,
  }
)
```

## Do not pass implicit proptypes
Actually can we avoid these implicit props? Or if you need something like this
```
const Dropdown = ({
  options, defaultValueIndex, onChange, minWidth, optionalReactSelectOptions
}) => (
  <Select
    // ...
    {...optionalReactSelectOptions}
  />
);
```
This way you can use prop-types for that :)

Yeah it seems implicit that we would like to wanna avoid by using proptypes/defaultprops.

In the example, shall we pass the optional props with
```
// Parent component
<Dropdown
  optionalSelectOptions={{
    isMulti: true,
    selectOption: "foo",
  }}
/>

// Dropdown/v2/index.jsx
Dropdown.propTypes = {
  // ...
  optionalSelectOptions: PropTypes.shape({
    isMulti: PropTypes.string.isRequired,
    selectOption: PropTypes.string,
  }),
};
```

Then shall we gonna make proptypes with the some options that we put in the future?
(e.g. if someone want to pass isMulti prop and it's kinda optional thing -> put it in optionalSelectOptions and write the propTypes)

## PropTypes와 Immutable
1. Get the value from deep Immutable object in 'connect()' and return scalar/base types.
```
Yes, but instead of something like `userSelector(state).get("displayName")` you should create a `userDisplayNameSelector(state)` selector that returns a base type `String` (the user displayName)
```

2. So avoid using Immutable types in react components except for optimisation purpose -> `Yes`
3. Then what about I want to return json in 'connect()'? Choose 'Immutable' or '.toJS()' case by case would be enough?
```
For this, use `react-redux-immutable`, never use `toJS()` in the connect function, this is by far the worst for optimization.
```
4. 이름 짓기 방법
if we start using selectors everywhere you might want to change how you call/name/import them, I think the following is easier to read. But this is up to you:
```js
import * as userSelectors from "selectors/user";
userDisplayName: userSelectors.getDisplayName(state);
```
5. PropTypes를 Immutable로 하려면?
```
React.PropTypes.instanceOf(Immutable.List)
```


## Dealing with unused parameters
Also if you want to not use a parameter you can still write seomthing like `(_unusedParameterA, b) =>` and eslint will be ok :+1:


## actionCreator and lift
### question
Who is comfortable with the `actionCreator` and `lift` utils? I really have a hard time understanding the reasoning behind it. It is really opaque, adds a layer of complexity and obfuscates the function signature, it also breaks possible tree-shaking of unused actions.

**Using `actionCreator` and `lift`**
```// Need to import complex utils
import {lift, actionCreator} from "../util"

// Will automagically create functions using string manipulation from all caps to camelCase
const actions = actionCreator(fooBarTypes)

// Arguments needed are totally obfuscated
export const getAllFooBar = lift(actions.getAllFooBar)
```

**Following standard redux action definition**
```

// No import, standard javascript, explicit function signature (you don't need to guess function name and arguments)
export const getAllFooBar = () => ({ type: fooBarTypes.GET_ALL});```
or

```// No import, standard javascript, explicit function signature (you don't need to guess function name and arguments)
export const getAllFoo = bar => ({ type: fooBarTypes.GET_ALL, bar});
```

### answer
those are just sugar to:
- create the actions from the types
- bring the dispatch directly (so you dont need to use connect from the component etc you just need to call the function)

### sum up
- The `actionCreator` util should be deprecated because it obfuscates function signature and it breaks tree-shaking
- The `lift` util should be deprecated because it re-implements a util that redux provides as `bindActionCreators`
- Use `bindActionCreators` for the following use case :
> Need to pass actions from `<Parent />` that is aware of redux (that has `dispatch` in props) down to `<Child />` that is not aware of redux without being able to pass `dispatch`. Otherwise follow the standard pattern (declare the actions needed by the component in the `connect` function)
