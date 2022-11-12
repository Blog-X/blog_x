import { BsStars } from "react-icons/bs";
import Blogs from "./Blogs";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
  headerTitle: `text-xl font-bold items-center`,
};

const Feed = ({ profile }) => {
  return (
    <div className="bg-slate-800 pb-4">
      <div className={style.wrapper}></div>
      <div>
        <Blogs profile={profile} />
      </div>
    </div>
  );
};

export default Feed;
