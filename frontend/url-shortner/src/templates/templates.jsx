import Layout1 from "../oneLinkPagesDemo/Layout1.jsx";
import Layout2 from "../oneLinkPagesDemo/Layout2.jsx";
import Layout3 from "../oneLinkPagesDemo/Layout3.jsx";
import LayoutMain1 from "../oneLinkPages/Layout1.jsx";
import LayoutMain2 from "../oneLinkPages/Layout2.jsx";
import LayoutMain3 from "../oneLinkPages/Layout3.jsx";


const templates = [
    {
        id: 1,
        name: "Minimal Layout",
        component: Layout1,
        actualComponent: LayoutMain1,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 2,
        name: "Creative Layout",
        component: Layout1,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 3,
        name: "Professional Layout",
        component: Layout1,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
];

export default templates;
