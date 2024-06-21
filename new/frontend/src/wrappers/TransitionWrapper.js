import { CSSTransition } from 'react-transition-group';

function TransitionWrapper({ children, location }) {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="page"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
}

export default TransitionWrapper;