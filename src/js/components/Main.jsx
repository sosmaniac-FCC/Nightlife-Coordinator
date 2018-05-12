import React from 'react';

export default function(props) {
    return (
        <div className="icon-block" style={{marginTop: "10%"}}>
            <h2 className="center black-text"><i className="fa fa-cutlery fa-2x red" style={{border: "3px solid black", borderRadius: "50%", padding: "50px"}}></i></h2>
            <h5 className="center">Going out?</h5>
            <p className="light center">Use the above search bar to search for local bars</p>
        </div>
    );
}