import React from "react";

function SearchForm(props) {
    return(
        <section>
            <form action="" style={{display:"flex", justifyContent:"center"}}>
                <label htmlFor="">
                    <input type="text" style={{padding:"10px", outline:"none"}} />
                </label>
                <input type="submit" value="추가" />
            </form>
        </section>
    )
}

export default SearchForm;