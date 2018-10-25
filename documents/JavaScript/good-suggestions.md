
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
