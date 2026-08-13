import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-RBDcsRzV.js";import{at as r,i,nt as a,t as o,vt as s}from"./lucide-react-CMOPidbD.js";import{c,o as l,r as u,s as d,t as f}from"./card-BWcj9ctO.js";import{n as p,t as m}from"./skeleton-CjR7zXEp.js";function h({title:e,value:t,subLabel:n,icon:r,tone:i=`neutral`,loading:a=!1}){return(0,g.jsxs)(f,{shadow:`none`,children:[(0,g.jsx)(l,{className:`flex flex-row items-center justify-between space-y-0 pb-2`,children:(0,g.jsxs)(`div`,{className:`flex items-center gap-3`,children:[a?(0,g.jsx)(m,{className:`h-9 w-9 rounded-lg`}):(0,g.jsx)(`div`,{className:`rounded-lg p-2 ${i===`warning`?`bg-warning/10 text-warning`:`bg-muted text-muted-foreground`}`,children:(0,g.jsx)(r,{className:`h-5 w-5`})}),(0,g.jsx)(d,{className:`text-muted-foreground text-sm font-medium`,children:a?(0,g.jsx)(m,{className:`h-4 w-24`}):e})]})}),(0,g.jsx)(u,{className:`pt-2`,children:a?(0,g.jsxs)(`div`,{className:`space-y-2`,children:[(0,g.jsx)(m,{className:`h-8 w-20`}),(0,g.jsx)(m,{className:`h-3 w-32`})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{className:`text-3xl font-bold tracking-tight`,children:t}),(0,g.jsx)(`p`,{className:`text-muted-foreground mt-1 text-xs`,children:n})]})})]})}var g,_=e((()=>{g=t(n(),1),c(),p(),h.__docgenInfo={description:``,methods:[],displayName:`MetricCardView`,props:{tone:{defaultValue:{value:`'neutral'`,computed:!1},required:!1},loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),v,y,b,x,S,C,w;e((()=>{_(),o(),v={title:`Studio/Shared/MetricCard`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{title:{control:`text`,description:`The title of the metric card`},value:{control:`text`,description:`The main value displayed in the card`},subLabel:{control:`text`,description:`The secondary label or description`},icon:{control:!1,description:`Lucide icon component to display`},tone:{control:`select`,options:[`neutral`,`warning`],description:`Visual tone of the icon container`,table:{defaultValue:{summary:`neutral`}}},loading:{control:`boolean`,description:`Whether the card is in a loading state`,table:{defaultValue:{summary:`false`}}}}},y={args:{title:`Total Users`,value:`12,847`,subLabel:`Active students this month`,icon:i,tone:`neutral`,loading:!1}},b={args:{title:`Question Papers`,value:`4,520`,subLabel:`Across 12 universities`,icon:r,tone:`neutral`,loading:!1}},x={args:{title:`Academic Branches`,value:`18`,subLabel:`Supporting 450+ subjects`,icon:a,tone:`neutral`,loading:!1}},S={args:{title:`Pending Reviews`,value:`24`,subLabel:`Requires immediate attention`,icon:s,tone:`warning`,loading:!1}},C={args:{...y.args,loading:!0}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Total Users',
    value: '12,847',
    subLabel: 'Active students this month',
    icon: Users,
    tone: 'neutral',
    loading: false
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Question Papers',
    value: '4,520',
    subLabel: 'Across 12 universities',
    icon: FileText,
    tone: 'neutral',
    loading: false
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Academic Branches',
    value: '18',
    subLabel: 'Supporting 450+ subjects',
    icon: GraduationCap,
    tone: 'neutral',
    loading: false
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Pending Reviews',
    value: '24',
    subLabel: 'Requires immediate attention',
    icon: Clock,
    tone: 'warning',
    loading: false
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...UsersMetric.args,
    loading: true
  }
}`,...C.parameters?.docs?.source}}},w=[`UsersMetric`,`PapersMetric`,`AcademicsMetric`,`PendingMetric`,`Loading`]}))();export{x as AcademicsMetric,C as Loading,b as PapersMetric,S as PendingMetric,y as UsersMetric,w as __namedExportsOrder,v as default};