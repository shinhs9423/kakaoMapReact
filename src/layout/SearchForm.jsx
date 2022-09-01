import React from "react";

function SearchForm(props) {



    return(
        <section>
            <form action="" style={{display:"flex", justifyContent:"center"}}>
                <label htmlFor="">
                    <input type="text" style={{padding:"10px", outline:"none"}} onChange={(e)=>{
                        console.log(e.target.value);
                    }}/>
                </label>
                <input type="submit" value="추가" />
            </form>
            <div id="suggest">
                <ul style={{position:"absolute",left:"50%", border:"1px solid #ccc", transform :"translate(-50%)", width:"235px"}}>
                    <li><a>buslist</a></li>
                </ul>
            </div>
        </section>
    )
}

export default SearchForm;