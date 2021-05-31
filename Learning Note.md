# Problems

Remaining problems:
- [ ] When dragging items, the item is removed from the list and the container becomes one item shorter.
- [ ] Not-square circle (ellipsis) for CheckIcon.
- A bunch of warnings when running the server.

### Last element remove first

- rendering a list using map
- with react-transition-group(TransitionGroup, CSSTransition)

---

`CSSTransition` have to be a direct child of TransitionGroup, otherwise the transition won't work
`CSSTransition` can't be extracted into a seperate item component, if so, the last element would not be removed.

```jsx
// wrong
const Item = ({id, text}) => (
  <CSSTransition timeout={500} classNames="item">...</CSSTransition>
)
itemList.map((item, index) => <Item key={index} {...item} />)

// correct: see the following
```

---

```jsx
// doesn't work: key={index}
itemList.map((item, index) => {
  return (
    <CSSTransition key={index} >...</CSSTransition>
  )
})

// work: key={item.id}
itemList.map((item, index) => {
  return (
    <CSSTransition key={item.id} >...</CSSTransition>
  )
})
```

# Techniques

### Hide scroll bar


```css
*{
    -ms-overflow-style: none;
}
::-webkit-scrollbar {
    display: none;
}
```

### Optimization for Global Context

I use global context value as an object that stores a list of states and set state functions.

Problem: when one of the value, e.g. `isDark` , gets updated, the global context value itself is updated, causing every component that uses the global context to re-render.

Solutions:

#### Control the update of the context value

Control the update of the context value itself by memoizing it

```jsx
const App = () => {
  const [user, setUser] = React.useState('');
  const [hideSideMenu, setHideSideMenu] = React.useState(false);

  const ctx = React.useMemo(() => ({
    user,
    setUser,
    hideSideMenu,
    setHideSideMenu,
  }), [user, hideSideMenu]);

  ...

  return <Ctx.Provider value={ctx}>...</Ctx.Provider>;
}
```

#### Memo the Selector

Child components maybe only use some part of the value of the context. However, the value has always been updated as a whole. If it is high cost for your component to rerender, memorize your selector of the value is a good choice.

At the consumer component level, block the re-render of component by extracting out context into a seperate wrapper component.

```jsx
const SideMenu = () => {
  const { setHideSideMenu, hideSideMenu } = useContext(Ctx);
  return React.useMemo(() => (
    <aside>
      <Menu hide={hideSideMenu} />
      <button onClick={() => setHideSideMenu(x => !x)}>toggle</button>
    </aside>
  ), [hideSideMenu, setHideSideMenu]);
};
```

#### Split the context

When using context in React we should not try to build a ‘single store tree’. It really makes the app hard to optimise. For most cases, contexts can be split into different pieces by their duties.

(Haven't used this method yet)

```jsx
const App = () => {
  const [user, setUser] = React.useState('');

  ...

  return (
    <UserState.Provider value={user}>
      <UserSetter.Provider value={setUser}>
        ...
      </UserSetter.Provider>
    </UserState.Provider>
  );
}
```

### Change the color of svg via CSS


# Resources

https://github.com/atlassian/react-beautiful-dnd

