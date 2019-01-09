import React, { Component } from 'react';
import '../stylesheets/message-board.css';

class MessageBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: "",
            messagesContainer: []
        }
        this.handleMessageInput = this.handleMessageInput.bind(this);
    }
    componentWillMount() {
        this.props.switchNav();
        this.props.hideDropDown();
    }
    handleMessageInput(event) {
        event.preventDefault();
        const {messagesContainer} = this.state;
        messagesContainer.push(this.state.messages);
        this.setState({
            messagesContainer,
            messages: ""
        })
    }
    enterKey(event){
        if(event.keyCode === 13){
            this.handleMessageInput();
        }
        return;
    }
    render() {
        const {messages, messagesContainer} = this.state;
        var displayMessages = messagesContainer.map((item, index)=>{
            return(
                <div className="message-container">
                    {item}
                </div>
            )
        })
        console.log("this is the messages container: ", messages, messagesContainer);
        return (
            <div className="message-board-container">
                <div className="todo-list">This is the todo list</div>
                <div className="messages-container">
                    <div className="messages-display">{displayMessages}</div>
                    <div className="input-container">
                        <div className="row">
                            <form onSubmit={this.handleMessageInput} action="" className="col s12">
                                <input value={messages} 
                                onChange={event => {
								this.setState({ messages: event.target.value });}} type="text" className="validate col s8" />
                                <button onkeypress={this.enterKey} className="col s4 waves-effect btn">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="users-online">Users online</div>
            </div>
        )
    }
}
export default MessageBoard;