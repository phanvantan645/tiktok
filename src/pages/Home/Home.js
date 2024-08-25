/* eslint-disable array-callback-return */
import RecommendVideo from '~/components/RecommendVideo';
import Content from '~/layouts/components/Content';
import videos from '~/assets/videos';

const data = [
    {
        nickname: 'hoaahanassii',
        video: videos.video1,
        isFollow: true,
        isLiked: false,
        description:
            'Lần đầu mang giày đi chơi 😂😂😂#dangyeu #cute #khoanhkhacdangyeu #dethuong #petcute #thucung #chó',
    },
    {
        nickname: 'cciinnn',
        video: videos.video2,
        isFollow: false,
        isLiked: true,
        description:
            'Trả lời @bantengi?123 còn thiếu siêu phẩm cá mập nào không anh em nhỉ #ThanhThoiLuotTet #baplegraphy #onetmedia #baple #tiktokgiaitri #tiktoksoiphim #filmtok #movietok',
    },
    {
        nickname: 'sondnf8',
        video: videos.video3,
        isFollow: false,
        isLiked: false,
        description: 'Lặn Phú Quý đi các bác ơi #xuhuong #fyb #freediving #phuquyisland',
    },
    {
        nickname: 'anhthien632001',
        video: videos.video4,
        isLiked: false,
        isFollow: false,
        description: 'Với 1L xăng Ninja H2 Carbon đi được bao xa? #h2 #kawasaki #learnontiktok #dờ #vtvcab',
    },
];

function Home() {
    return (
        <Content>
            {data &&
                data.map((e, i) => {
                    return <RecommendVideo key={i} data={e} />;
                })}
        </Content>
    );
}

export default Home;
