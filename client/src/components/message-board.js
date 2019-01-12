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
    // componentWillMount() {
    //     this.props.switchNav();
    //     this.props.hideDropDown();
    // }
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
    hideMessageBoard(){
        document.getElementsByClassName("message-board-container")[0].classList.toggle("full-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.remove("close-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.toggle("hide-message-container");
    }
    closeMessageBoard(){
        document.getElementsByClassName("message-board-container")[0].classList.remove("full-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.remove("hide-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.add("close-message-container");
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
        return (
            <div className="message-board-container">
            <div className="close-message-container">
                <span className="left">Messages</span>
                <i onClick={this.closeMessageBoard} className="tiny close-message-window right material-icons">highlight_off</i>
                <i onClick={this.hideMessageBoard} className="tiny close-message-window right material-icons">remove</i>

            </div>
                <div className="messages-container">
                    <div className="messages-display">{displayMessages}</div>
                    <div className="divider"></div>
                    <div className="input-container">
                        <div className="row">
                            <form onSubmit={this.handleMessageInput} action="" className="col s12 form-message">
                                <input value={messages} 
                                onChange={event => {
								this.setState({ messages: event.target.value });}} type="text" className="validate col s8 message-input-box" />
                                <button onkeypress={this.enterKey} className="col s4 waves-effect btn message-send">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MessageBoard;