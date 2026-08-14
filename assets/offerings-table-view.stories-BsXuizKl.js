import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-CrptbQ_u.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{Ft as o,Mt as s,Y as c,d as l,gt as u,t as ee,tt as d,ut as f,zt as p}from"./lucide-react-BBt6KM8f.js";import{r as m,t as h}from"./button-nBh6mER0.js";import{c as g,i as _,l as v,n as y,o as b,s as x,t as S}from"./table-DJFJVpMy.js";import{a as C,g as te,h as ne,o as re,r as w,t as T,u as E}from"./dropdown-menu-DMG9PC37.js";import{a as D,c as O,o as k,r as A,t as j}from"./card-1l6SkXs7.js";import{a as M,c as N,i as P,n as F,o as I,s as L,t as R}from"./pagination-CUMJHjV_.js";import{n as z,t as B}from"./badge-CyKZWmC4.js";import{n as V,t as H}from"./skeleton-ByzCpkCS.js";function U({offerings:e=[],pagination:t,search:n,onDelete:r,loading:i=!1}){return i?(0,W.jsxs)(j,{className:`border-border/50 border p-0 shadow-none`,children:[(0,W.jsxs)(k,{className:`pb-3`,children:[(0,W.jsx)(H,{className:`mb-2 h-8 w-48`}),(0,W.jsx)(H,{className:`h-4 w-64`})]}),(0,W.jsx)(A,{children:(0,W.jsxs)(S,{children:[(0,W.jsx)(x,{children:(0,W.jsxs)(g,{className:`bg-muted/50`,children:[(0,W.jsx)(b,{className:`w-[300px]`,children:`Offering`}),(0,W.jsx)(b,{children:`Hierarchy`}),(0,W.jsx)(b,{children:`Regulation`}),(0,W.jsx)(b,{children:`Year`}),(0,W.jsx)(b,{className:`w-[100px]`})]})}),(0,W.jsx)(y,{children:[1,2,3,4,5].map(e=>(0,W.jsxs)(g,{children:[(0,W.jsx)(_,{children:(0,W.jsx)(H,{className:`h-5 w-40`})}),(0,W.jsx)(_,{children:(0,W.jsx)(H,{className:`h-5 w-32`})}),(0,W.jsx)(_,{children:(0,W.jsx)(H,{className:`h-5 w-16`})}),(0,W.jsx)(_,{children:(0,W.jsx)(H,{className:`h-5 w-12`})}),(0,W.jsx)(_,{children:(0,W.jsx)(H,{className:`h-8 w-8 rounded-full`})})]},e))})]})})]}):(0,W.jsxs)(j,{className:`border-border/50 border p-0 shadow-none`,children:[(0,W.jsx)(A,{className:`overflow-x-auto p-0`,children:(0,W.jsxs)(S,{className:`min-w-[480px]`,children:[(0,W.jsx)(x,{children:(0,W.jsxs)(g,{className:`text-muted-foreground border-b text-xs font-bold tracking-wider uppercase hover:bg-transparent`,children:[(0,W.jsx)(b,{className:`text-foreground w-[300px] font-bold`,children:`Subject Offering`}),(0,W.jsx)(b,{className:`text-foreground font-bold`,children:`Hierarchy`}),(0,W.jsx)(b,{className:`text-foreground hidden font-bold sm:table-cell`,children:`Regulation`}),(0,W.jsx)(b,{className:`text-foreground hidden font-bold sm:table-cell`,children:`Academic Year`}),(0,W.jsx)(b,{className:`text-foreground w-[100px] text-right text-xs font-bold tracking-widest uppercase`,children:`Actions`})]})}),(0,W.jsx)(y,{children:e.length===0?(0,W.jsx)(g,{children:(0,W.jsx)(_,{colSpan:5,className:`font-roboto text-muted-foreground h-48 text-center italic`,children:n?`No subject offerings match your criteria.`:`No subject offerings defined for this track.`})}):e.map(e=>(0,W.jsxs)(g,{className:`group hover:bg-muted/30 border-b transition-colors`,children:[(0,W.jsx)(_,{className:`py-4`,children:(0,W.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,W.jsx)(`div`,{className:`border-success/20 bg-success/5 text-success dark:border-success/30 dark:bg-success/10 dark:text-success flex h-10 w-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-110`,children:(0,W.jsx)(p,{className:`h-5 w-5`})}),(0,W.jsxs)(`div`,{className:`flex min-w-0 flex-col`,children:[(0,W.jsx)(`span`,{className:`font-roboto text-foreground group-hover:text-primary cursor-pointer truncate font-bold transition-colors`,children:e.subjectId?.name||`Unknown Subject`}),(0,W.jsx)(`span`,{className:`text-muted-foreground font-roboto text-xs italic`,children:e.subjectId?.subjectCode||`No Code`})]})]})}),(0,W.jsx)(_,{children:(0,W.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,W.jsxs)(`div`,{className:`font-roboto text-foreground flex items-center gap-1.5 text-xs font-medium`,children:[(0,W.jsx)(o,{className:`text-muted-foreground h-3 w-3`}),(0,W.jsx)(`span`,{children:e.universityId?.shortName||e.universityId?.name||`N/A`})]}),(0,W.jsxs)(`div`,{className:`font-roboto text-muted-foreground flex items-center gap-1.5 text-[10px]`,children:[(0,W.jsx)(d,{className:`h-3 w-3`}),(0,W.jsx)(`span`,{children:e.branchId?.shortName||e.branchId?.name||`N/A`}),(0,W.jsx)(`span`,{className:`mx-1`,children:`•`}),(0,W.jsxs)(`span`,{className:`text-primary font-bold`,children:[`Sem `,e.semesterId?.number||`N/A`]})]})]})}),(0,W.jsx)(_,{className:`hidden sm:table-cell`,children:(0,W.jsx)(B,{variant:`outline`,className:`bg-muted/30 border-primary/20 text-primary dark:border-primary/30 dark:text-primary border font-mono font-bold`,children:e.regulation||`General`})}),(0,W.jsx)(_,{className:`hidden sm:table-cell`,children:(0,W.jsxs)(`div`,{className:`font-roboto flex items-center gap-2 text-sm font-medium`,children:[(0,W.jsx)(s,{className:`text-muted-foreground h-4 w-4`}),e.academicYear||`Ongoing`]})}),(0,W.jsx)(_,{className:`text-right`,children:(0,W.jsxs)(T,{children:[(0,W.jsx)(ne,{asChild:!0,children:(0,W.jsx)(h,{variant:`ghost`,className:`hover:bg-muted/50 h-9 w-9 rounded-md border p-0 transition-colors`,children:(0,W.jsx)(f,{className:`h-4 w-4`})})}),(0,W.jsxs)(w,{align:`end`,className:`font-roboto w-56 border p-2 shadow-none`,children:[(0,W.jsx)(re,{className:`text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase`,children:`Offering Controls`}),(0,W.jsx)(E,{className:`my-1 border-b`}),(0,W.jsxs)(C,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:[(0,W.jsx)(u,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`View Syllabus`})]}),(0,W.jsxs)(C,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:[(0,W.jsx)(c,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`text-primary font-medium`,children:`Learning Materials`})]}),(0,W.jsx)(E,{className:`my-1 border-b`}),(0,W.jsxs)(C,{className:`text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>r?.(e.id),children:[(0,W.jsx)(l,{className:`text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-bold`,children:`Withdraw Offering`})]})]})]})})]},e.id))})]})}),t&&t.pages>1&&(0,W.jsx)(D,{className:`flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center`,children:(0,W.jsx)(R,{className:`mx-0 w-auto justify-start`,children:(0,W.jsxs)(F,{children:[(0,W.jsx)(P,{children:(0,W.jsx)(L,{href:t.current>1?`?page=${t.current-1}`:`#`,className:t.current===1?`pointer-events-none opacity-50`:`border`})}),[...Array(t.pages)].map((e,n)=>{let r=n+1;return r===1||r===t.pages||r>=t.current-1&&r<=t.current+1?(0,W.jsx)(P,{children:(0,W.jsx)(M,{href:`?page=${r}`,isActive:r===t.current,className:`font-roboto border font-bold`,children:r})},r):null}),(0,W.jsx)(P,{children:(0,W.jsx)(I,{href:t.current<t.pages?`?page=${t.current+1}`:`#`,className:t.current===t.pages?`pointer-events-none opacity-50`:`border`})})]})})})]})}var W,G=e((()=>{W=t(n(),1),r(),ee(),v(),te(),O(),N(),m(),z(),V(),U.__docgenInfo={description:``,methods:[],displayName:`OfferingsTableView`,props:{offerings:{defaultValue:{value:`[]`,computed:!1},required:!1},loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),K,q,J,Y,X,Z,Q,$;e((()=>{G(),a(),K={title:`Studio/Academics/OfferingsTable`,component:U,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{offerings:{control:`object`,description:`List of subject offerings to display`},pagination:{control:`object`,description:`Pagination state`},search:{control:`text`,description:`Search query for filtering offerings`},loading:{control:`boolean`,description:`Loading state of the table`,table:{defaultValue:{summary:`false`}}},onDelete:{description:`Callback when an offering is withdrawn`}},args:{onDelete:i(),search:``}},q=[{id:`65f1a2b3c4d5e6f7a8b9c0d1`,subjectId:{name:`Data Structures`,subjectCode:`CS301`},universityId:{name:`University of Mumbai`,shortName:`MU`},branchId:{name:`Computer Engineering`,shortName:`COMP`},semesterId:{number:3},regulation:`R2019`,academicYear:`2023-24`},{id:`65f1a2b3c4d5e6f7a8b9c0d2`,subjectId:{name:`Operating Systems`,subjectCode:`CS401`},universityId:{name:`University of Mumbai`,shortName:`MU`},branchId:{name:`Computer Engineering`,shortName:`COMP`},semesterId:{number:4},regulation:`R2019`,academicYear:`2023-24`},{id:`65f1a2b3c4d5e6f7a8b9c0d3`,subjectId:{name:`Mathematics-III`,subjectCode:`MA301`},universityId:{name:`IIT Bombay`,shortName:`IITB`},branchId:{name:`Mechanical Engineering`,shortName:`MECH`},semesterId:{number:3},regulation:`2022`,academicYear:`2024-25`}],J={args:{offerings:q,pagination:{total:3,pages:1,current:1},loading:!1}},Y={args:{offerings:[],loading:!0}},X={args:{offerings:[],pagination:{total:0,pages:0,current:0},loading:!1}},Z={args:{offerings:q,pagination:{total:30,pages:10,current:1},loading:!1}},Q={args:{offerings:[],pagination:{total:0,pages:0,current:0},search:`Quantum Physics`,loading:!1},parameters:{nextjs:{navigation:{query:{search:`Quantum Physics`}}}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    offerings: mockOfferings,
    pagination: {
      total: 3,
      pages: 1,
      current: 1
    },
    loading: false
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    offerings: [],
    loading: true
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    offerings: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    loading: false
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    offerings: mockOfferings,
    pagination: {
      total: 30,
      pages: 10,
      current: 1
    },
    loading: false
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    offerings: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    search: 'Quantum Physics',
    loading: false
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Quantum Physics'
        }
      }
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Loading`,`Empty`,`WithPagination`,`NoResults`]}))();export{J as Default,X as Empty,Y as Loading,Q as NoResults,Z as WithPagination,$ as __namedExportsOrder,K as default};