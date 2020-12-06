import React from 'react';
import Aux from '../../HOC/Auxiliary';
import styleModule from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideDrawer: false,
    };
  }

  backDropCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar openSideBar={this.toggleSideBar} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.backDropCloseHandler}
        />
        <div className={styleModule.Content}>{this.props.children}</div>
      </Aux>
    );
  }
}
export default Layout;
