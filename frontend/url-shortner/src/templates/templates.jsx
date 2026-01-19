import Layout1 from "../oneLinkPagesDemo/Layout1.jsx";
import Layout2 from "../oneLinkPagesDemo/Layout2.jsx";
import Layout3 from "../oneLinkPagesDemo/Layout3.jsx";
import Layout4 from "../oneLinkPagesDemo/Layout4.jsx";
import Layout5 from "../oneLinkPagesDemo/Layout5.jsx";
import Layout6 from "../oneLinkPagesDemo/Layout6.jsx";

import LayoutMain1 from "../oneLinkPages/Layout1.jsx";
import LayoutMain2 from "../oneLinkPages/Layout2.jsx";
import LayoutMain3 from "../oneLinkPages/Layout3.jsx";
import LayoutMain4 from "../oneLinkPages/Layout4.jsx";
import LayoutMain5 from "../oneLinkPages/Layout5.jsx";
import LayoutMain6 from "../oneLinkPages/Layout6.jsx";


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
        component: Layout2,
        actualComponent: LayoutMain2,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 3,
        name: "Professional Layout",
        component: Layout3,
        actualComponent: LayoutMain3,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 4,
        name: "Cyberpunk Glass",
        component: Layout4,
        actualComponent: LayoutMain4,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 5,
        name: "Neo Brutalism",
        component: Layout5,
        actualComponent: LayoutMain5,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    },
    {
        id: 6,
        name: "Soft Abstract",
        component: Layout6,
        actualComponent: LayoutMain6,
        metadata: {
            links: 5,
            images: 0,
            fields: ["username", "name", "bio"],
        },
    }
];

export default templates;
