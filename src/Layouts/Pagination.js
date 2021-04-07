import { React, useEffect, useState } from "react";

const Pagination = (data) => {

    const { pageLimit, totalPost, navigatePage } = data;
    const [counter, setCounter] = useState(1)
    console.log('val====' + totalPost);
    const totalPageBtn = Math.ceil(totalPost / pageLimit)
    // const [showPreviousBtn,setShowPreviousBtn] = useState(true)
    // const [showNextBtn,setShowNextBtn] = useState(false)

    const managePaging = (button) => {
        if (button === "prev") {
            if (counter == 1) {
                setCounter(1);
                // setShowPreviousBtn(true);
            } else {

                if (counter == 2) {
                    // setShowPreviousBtn(true);
                } else {
                    // setShowPreviousBtn(false);
                }
                setCounter(counter - 1);
            }
            // setShowNextBtn(false);


        } else if (button === "next") {
            if (counter == totalPageBtn) {
                setCounter(counter);
                // setShowNextBtn(true);
            } else {
                if (counter == totalPageBtn - 1) {
                    // setShowNextBtn(true);
                } else {
                    // setShowNextBtn(false);
                }
                setCounter(counter + 1);
            }
            // setShowPreviousBtn(false);

        }

    }
    useEffect(() => {
        const result = counter * pageLimit;
        navigatePage((parseInt(result) - parseInt(pageLimit)), result);
        debugger
        console.log("valueeee====" + totalPost);
    }, [counter])

    return (

        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={e => { managePaging("prev") }}>Previous</a></li>
                    {
                        new Array(totalPageBtn).fill("").map((pageBtn, index) => (
                            <li class={`page-item  ${index == counter - 1 ? "active" : ""}`}>
                                <a class="page-link" onClick={(e) => setCounter(index + 1)}>{index + 1}</a>
                            </li>
                        ))
                    }
                    <li class="page-item"><a class="page-link" onClick={e => { managePaging("next") }}>Next</a></li>
                </ul>
            </nav>
        </div>
        // <div className="d-flex justify-content-between">
        //     <nav aria-label="Page navigation example">
        //         <ul class="pagination">
        //             {/* <button className="btn btn-primary previous-btn {showPreviousBtn == true  ? 'hidden' : ''"  onClick={e => { managePaging("prev")}}>Previous</button> */}
        //             <button className="btn btn-primary previous-btn"  disabled={showPreviousBtn} onClick={e => { managePaging("prev")}}>Previous</button>
        //             {/* <button className="btn btn-primary previous-btn"  onClick={e => { managePaging("prev")}}>Previous</button> */}
        //             <button className="btn btn-primary next-btn" disabled={showNextBtn} onClick={e => { managePaging("next")}}>Next</button>
        //         </ul>
        //     </nav>
        // </div>
    )
}

export default Pagination;