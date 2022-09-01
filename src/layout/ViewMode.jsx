
function ViewMode() {

  return (
    <section>
        <form className="viewMode_wrap" action="localhost:3000/" method="get">
            <a href="./bus" className="viewMode_btn">버스명</a>
            <a href="./shellter" className="viewMode_btn">정류소</a>
        </form>
    </section>
  );
}

export default ViewMode;