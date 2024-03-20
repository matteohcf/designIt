import { useEffect } from "react";
import { BsFillPaletteFill } from "react-icons/bs";

function InfiniteScroll () {
    useEffect(() => {
        const scrollers = document.querySelectorAll(".scroller");
        addAnimation();

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

    return (
        <>
            <div class="scroller" data-speed="fast">
                <ul class="tag-list scroller__inner">
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#F7EEDD" size={70} /></li>
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#C0C2C8" size={70} /></li>
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#9EAAB2" size={70} /></li>
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#FAF8FF" size={70} /></li>
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#7C9399" size={70} /></li>
                    <li><BsFillPaletteFill className="BsFillPaletteFill" color="#C2BFD2" size={70} /></li>
                </ul>
            </div>
        </>
    );
}

export default InfiniteScroll;
