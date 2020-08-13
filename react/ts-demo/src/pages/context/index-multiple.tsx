import React, { createContext } from 'react';

// 消费多个 Context

const ThemeContext = React.createContext('light')
const UserContext = React.createContext({
  name: 'guest',
})

export class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    // const { theme, singedInUser } = this.props
    const { theme, singedInUser } = { theme: 'dd', singedInUser: { name: 'guest3 '}}
    // const { theme, singedInUser } = { theme: 'dd', singedInUser: 'guest2' }
    return (
      <>
        <h2>multiple content</h2>
        <ThemeContext.Provider value={theme}>
          <UserContext.Provider value={singedInUser}>
          <ThemeContext.Consumer>
            {theme => (
              <UserContext.Consumer>
                {user => (
                  <div>
                    { user.name }
                   ---theme: { theme }
                  </div>
                )}
              </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }
}
