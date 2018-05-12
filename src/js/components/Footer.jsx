import React from 'react';

export default function(props) {
    // BUG: bottom bar is popping out of the viewport on Mobile/Tablet
    
    return (
        <div>
            <div className="footer-copyright" style={{
                position: "fixed",
                bottom: "0",
                margin: "0",
                padding: "0",
                width: "100%",
                backgroundColor: "black",
                opacity: "0.8",
                color: "white",
                textAlign: "center",
                zIndex: "1" }}>
                Made with <a className="orange-text text-lighten-3" href="http://materializecss.com" target="_blank">Materialize</a> and the <a className="red-text text-lighten-3" href="https://www.yelp.com/developers" target="_blank">Yelp API</a>
            </div>
        </div>
    );
}