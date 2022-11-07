import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

import { Button } from 'react-bootstrap';
import "./AccountPage.css"

export default class AccountPage extends React.Component {

    constructor() {
        super()
        this.state = {
            loginRegisterActive: "login"
        }
        this.handleLoginRegisterClick = this.handleLoginRegisterClick.bind(this);
    }
    
    handleLoginRegisterClick(item) {
        console.log("click")
        this.setState({loginRegisterActive: item})
    }


    render() {
        return (
            <div className="containerAccountPage">
            <div className="containerInnerAccount">
              <MDBTabs pills justify className='mb-3'>
                <MDBTabsItem className="login">
                  <MDBTabsLink
                    onClick={() => this.handleLoginRegisterClick('login')}
                    active={this.state.loginRegisterActive === 'login'}
                  >
                    Login
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => this.handleLoginRegisterClick('register')}
                    active={this.state.loginRegisterActive === 'register'}
                  >
                    Register
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
        
              <MDBTabsContent>
                <MDBTabsPane show={this.state.loginRegisterActive === 'login'}>
                  <form>
                    <div className='text-center mb-3'>
                      <p>Sign in with:</p>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='facebook-f' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='google' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='twitter' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='github' />
                      </Button>
                    </div>
        
                    <p className='text-center'>or:</p>
        
                    <MDBInput className='mb-4' type='email' id='form7Example1' placeholder='Email address' />
                    <MDBInput className='mb-4' type='password' id='form7Example2' placeholder='Password' />
        
                    <MDBRow className='mb-4'>
                      <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox id='form7Example3' label='Remember me' defaultChecked />
                      </MDBCol>
                      <MDBCol>
                        <a href='#!'>Forgot password?</a>
                      </MDBCol>
                    </MDBRow>
        
                    <Button type='submit' className='mb-4' block>
                      Sign in
                    </Button>
        
                    <div className='text-center'>
                      <p>
                        Not a member? <a href='#!' onClick={() => this.handleLoginRegisterClick('register')}>Register</a>
                      </p>
                    </div>
                  </form>
                </MDBTabsPane>
                <MDBTabsPane show={this.state.loginRegisterActive === 'register'}>
                  <form>
                    <div className='text-center mb-3'>
                      <p>Sign up with:</p>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='facebook-f' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='google' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='twitter' />
                      </Button>
        
                      <Button floating className='mx-1'>
                        <MDBIcon fab icon='github' />
                      </Button>
                    </div>
        
                    <p className='text-center'>or:</p>
        
                    <MDBInput className='mb-4' id='form8Example1' placeholder='Name' />
                    <MDBInput className='mb-4' id='form8Example2' placeholder='Username' />
                    <MDBInput className='mb-4' type='email' id='form8Example3' placeholder='Email address' />
                    <MDBInput className='mb-4' type='password' id='form8Example4' placeholder='Password' />
                    <MDBInput className='mb-4' type='password' id='form8Example5' placeholder='Repeat password' />
        
                    <MDBCheckbox
                      wrapperClass='d-flex justify-content-center mb-4'
                      id='form8Example6'
                      label='I have read and agree to the terms'
                      defaultChecked
                    />
        
                    <Button type='submit' className='mb-4' block>
                      Sign up
                    </Button>
                  </form>
                </MDBTabsPane>
              </MDBTabsContent>
              </div>
            </div>
          );
    }
}