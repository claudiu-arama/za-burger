import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            {/* using <Switch> to load only one route, that matches the path */}
            <Switch>
              <Route path="/checkout" component={Checkout} />
              {/* because of <Route>, the <BurgerBuilder> comp (only direct components)
              now gets access to the match, history and location props */}
              {/* components inside <BurgerBuilder> need to be wraped with HOC
              withRouter to get access to these props  */}
              <Route path="/orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
