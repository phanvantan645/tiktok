import * as request from '~/utils/httpRequest';
const search = async (q, type = 'less') => {
    try {
        const res = await request.get(`/users/search`, {
            params: {
                q: encodeURIComponent(q),
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default search;
