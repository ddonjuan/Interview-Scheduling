import React, {Component} from 'react';
// import "../assets/images/Allergan_Logo.png"

class Loader extends Component{

    // innerLoaderDivMultiplier(){
    //     for(var i = 0; i < 13; i++){
    //         var loaderDivs = document.createElement("div");
    //         document.getElementsByClassName("lds-default")[0].appendChild(loaderDivs);
    //     }
    // }
    render(){
        return(
            <div className="loader-container">
                <div className="pic-time"> </div>
                <div class="progress loader">
                    <div class="indeterminate"></div>
                </div>   
            </div>

        )
    }
}
export default Loader;
