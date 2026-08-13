import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DLJV3Qbr.js";import{ct as r,i,it as a,t as o,xt as s}from"./lucide-react-BdVUdILY.js";import{c,o as l,r as u,s as d,t as f}from"./card-DrMNsJ-3.js";import{n as p,t as m}from"./skeleton-BVGmdIPZ.js";function h({title:e,value:t,subLabel:n,icon:r,colorClass:i,bgClass:a,loading:o=!1}){return(0,g.jsxs)(f,{shadow:`none`,children:[(0,g.jsx)(l,{className:`flex flex-row items-center justify-between space-y-0 pb-2`,children:(0,g.jsxs)(`div`,{className:`flex items-center gap-3`,children:[o?(0,g.jsx)(m,{className:`h-9 w-9 rounded-lg`}):(0,g.jsx)(`div`,{className:`rounded-lg p-2 ${a}`,children:(0,g.jsx)(r,{className:`h-5 w-5 ${i}`})}),(0,g.jsx)(d,{className:`text-muted-foreground text-sm font-medium`,children:o?(0,g.jsx)(m,{className:`h-4 w-24`}):e})]})}),(0,g.jsx)(u,{className:`pt-2`,children:o?(0,g.jsxs)(`div`,{className:`space-y-2`,children:[(0,g.jsx)(m,{className:`h-8 w-20`}),(0,g.jsx)(m,{className:`h-3 w-32`})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{className:`text-3xl font-bold tracking-tight`,children:t}),(0,g.jsx)(`p`,{className:`text-muted-foreground mt-1 text-xs`,children:n})]})})]})}var g,_=e((()=>{g=t(n(),1),c(),p(),h.__docgenInfo={description:``,methods:[],displayName:`MetricCardView`,props:{loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),v,y,b,x,S,C,w;e((()=>{_(),o(),v={title:`Studio/Shared/MetricCard`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{title:{control:`text`,description:`The title of the metric card`},value:{control:`text`,description:`The main value displayed in the card`},subLabel:{control:`text`,description:`The secondary label or description`},icon:{control:!1,description:`Lucide icon component to display`},colorClass:{control:`text`,description:`Tailwind text color class for the icon`},bgClass:{control:`text`,description:`Tailwind background color class for the icon container`},loading:{control:`boolean`,description:`Whether the card is in a loading state`,table:{defaultValue:{summary:`false`}}}}},y={args:{title:`Total Users`,value:`12,847`,subLabel:`Active students this month`,icon:i,colorClass:`text-primary`,bgClass:`bg-primary/10`,loading:!1}},b={args:{title:`Question Papers`,value:`4,520`,subLabel:`Across 12 universities`,icon:r,colorClass:`text-info`,bgClass:`bg-info/10`,loading:!1}},x={args:{title:`Academic Branches`,value:`18`,subLabel:`Supporting 450+ subjects`,icon:a,colorClass:`text-success`,bgClass:`bg-success/10`,loading:!1}},S={args:{title:`Pending Reviews`,value:`24`,subLabel:`Requires immediate attention`,icon:s,colorClass:`text-warning`,bgClass:`bg-warning/10`,loading:!1}},C={args:{...y.args,loading:!0}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Total Users',
    value: '12,847',
    subLabel: 'Active students this month',
    icon: Users,
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
    loading: false
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Question Papers',
    value: '4,520',
    subLabel: 'Across 12 universities',
    icon: FileText,
    colorClass: 'text-info',
    bgClass: 'bg-info/10',
    loading: false
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Academic Branches',
    value: '18',
    subLabel: 'Supporting 450+ subjects',
    icon: GraduationCap,
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
    loading: false
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Pending Reviews',
    value: '24',
    subLabel: 'Requires immediate attention',
    icon: Clock,
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
    loading: false
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...UsersMetric.args,
    loading: true
  }
}`,...C.parameters?.docs?.source}}},w=[`UsersMetric`,`PapersMetric`,`AcademicsMetric`,`PendingMetric`,`Loading`]}))();export{x as AcademicsMetric,C as Loading,b as PapersMetric,S as PendingMetric,y as UsersMetric,w as __namedExportsOrder,v as default};