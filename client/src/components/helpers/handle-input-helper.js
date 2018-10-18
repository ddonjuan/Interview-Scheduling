export function showElement(elementClass){
    console.log("show Element fired");
    var element = document.getElementsByClassName(elementClass)[0];
    element.classList.toggle("hidden");
}
export function redirectLogin(){
    this.props.history.push("/interviewer-login");
}

