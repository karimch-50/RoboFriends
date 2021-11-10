import React,{Component} from 'react';
import CardList from '../Component/CardList';
import SearchBox from '../Component/SearchBox';
import Scroll from '../Component/Scroll'
import './App.css';
import ErrorBoundry from '../Component/ErrorBoundry';



class App extends Component {
    constructor() {
        super();
        this.state ={
            robots: [],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>response.json())
        .then(users=>this.setState({robots:users}));
    }

    onSearchChange = (event)=>{
        this.setState({ searchfield: event.target.value })
    }

    render(){
        const {searchfield,robots}=this.state;
        const filtersRobots = robots.filter(Robots=>{
            return Robots.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        });
        return !robots.length ? <h1>Loading...</h1> :
            <div className='tc'>
                <h1 className='f1'>RobotFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filtersRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default App;