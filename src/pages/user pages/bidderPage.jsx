import React, { Component } from 'react';
import SidebarTabsExample from './drawer';
import BidderLayout from '../layouts/bidderLayout';

export default class bidderPage extends Component {
  render() {
    return (
      <div>
        <BidderLayout/>
        <h1>Welcome to Admin Page</h1>

        <SidebarTabsExample />
        
      </div>
    )
  }
}
