import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-DxRZmAER.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{Bt as o,Gt as ee,Lt as s,St as c,Z as l,it as u,m as d,mt as f,t as p}from"./lucide-react-DYaxzfK7.js";import{r as te,t as ne}from"./button-D3AKQv-w.js";import{a as re,c as m,o as h,r as g,t as _}from"./card-BXRnUkWU.js";import{c as v,i as y,l as b,n as x,o as S,s as C,t as w}from"./table-B4HGVNIP.js";import{n as T,t as E}from"./badge-BJhRhrkY.js";import{a as D,g as O,h as k,o as A,r as j,t as M,u as N}from"./dropdown-menu-BKHLLlrS.js";import{a as P,c as F,i as I,n as L,o as R,s as z,t as B}from"./pagination-B9vzSE0y.js";import{n as V,t as H}from"./skeleton-C-dVjQ_J.js";function U({offerings:e=[],pagination:t,search:n,onDelete:r,loading:i=!1}){return i?(0,W.jsxs)(_,{className:`border-border/50 border-2 p-0 shadow-none`,children:[(0,W.jsxs)(h,{className:`pb-3`,children:[(0,W.jsx)(H,{className:`mb-2 h-8 w-48`}),(0,W.jsx)(H,{className:`h-4 w-64`})]}),(0,W.jsx)(g,{children:(0,W.jsxs)(w,{children:[(0,W.jsx)(C,{children:(0,W.jsxs)(v,{className:`bg-muted/50`,children:[(0,W.jsx)(S,{className:`w-[300px]`,children:`Offering`}),(0,W.jsx)(S,{children:`Hierarchy`}),(0,W.jsx)(S,{children:`Regulation`}),(0,W.jsx)(S,{children:`Year`}),(0,W.jsx)(S,{className:`w-[100px]`})]})}),(0,W.jsx)(x,{children:[1,2,3,4,5].map(e=>(0,W.jsxs)(v,{children:[(0,W.jsx)(y,{children:(0,W.jsx)(H,{className:`h-5 w-40`})}),(0,W.jsx)(y,{children:(0,W.jsx)(H,{className:`h-5 w-32`})}),(0,W.jsx)(y,{children:(0,W.jsx)(H,{className:`h-5 w-16`})}),(0,W.jsx)(y,{children:(0,W.jsx)(H,{className:`h-5 w-12`})}),(0,W.jsx)(y,{children:(0,W.jsx)(H,{className:`h-8 w-8 rounded-full`})})]},e))})]})})]}):(0,W.jsxs)(_,{className:`border-border/50 border-2 p-0 shadow-none`,children:[(0,W.jsx)(g,{className:`overflow-x-auto p-0`,children:(0,W.jsxs)(w,{className:`min-w-[480px]`,children:[(0,W.jsx)(C,{children:(0,W.jsxs)(v,{className:`text-muted-foreground border-b-2 text-xs font-bold tracking-wider uppercase hover:bg-transparent`,children:[(0,W.jsx)(S,{className:`text-foreground w-[300px] font-bold`,children:`Subject Offering`}),(0,W.jsx)(S,{className:`text-foreground font-bold`,children:`Hierarchy`}),(0,W.jsx)(S,{className:`text-foreground hidden font-bold sm:table-cell`,children:`Regulation`}),(0,W.jsx)(S,{className:`text-foreground hidden font-bold sm:table-cell`,children:`Academic Year`}),(0,W.jsx)(S,{className:`text-foreground w-[100px] text-right text-xs font-bold tracking-widest uppercase`,children:`Actions`})]})}),(0,W.jsx)(x,{children:e.length===0?(0,W.jsx)(v,{children:(0,W.jsx)(y,{colSpan:5,className:`font-roboto text-muted-foreground h-48 text-center italic`,children:n?`No subject offerings match your criteria.`:`No subject offerings defined for this track.`})}):e.map(e=>(0,W.jsxs)(v,{className:`group hover:bg-muted/30 border-b transition-colors`,children:[(0,W.jsx)(y,{className:`py-4`,children:(0,W.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,W.jsx)(`div`,{className:`border-success/20 bg-success/5 text-success dark:border-success/30 dark:bg-success/10 dark:text-success flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-transform group-hover:scale-110`,children:(0,W.jsx)(ee,{className:`h-5 w-5`})}),(0,W.jsxs)(`div`,{className:`flex min-w-0 flex-col`,children:[(0,W.jsx)(`span`,{className:`font-roboto text-foreground group-hover:text-primary cursor-pointer truncate font-bold transition-colors`,children:e.subjectId?.name||`Unknown Subject`}),(0,W.jsx)(`span`,{className:`text-muted-foreground font-roboto text-xs italic`,children:e.subjectId?.subjectCode||`No Code`})]})]})}),(0,W.jsx)(y,{children:(0,W.jsxs)(`div`,{className:`flex flex-col gap-1`,children:[(0,W.jsxs)(`div`,{className:`font-roboto text-foreground flex items-center gap-1.5 text-xs font-medium`,children:[(0,W.jsx)(o,{className:`text-muted-foreground h-3 w-3`}),(0,W.jsx)(`span`,{children:e.universityId?.shortName||e.universityId?.name||`N/A`})]}),(0,W.jsxs)(`div`,{className:`font-roboto text-muted-foreground flex items-center gap-1.5 text-[10px]`,children:[(0,W.jsx)(u,{className:`h-3 w-3`}),(0,W.jsx)(`span`,{children:e.branchId?.shortName||e.branchId?.name||`N/A`}),(0,W.jsx)(`span`,{className:`mx-1`,children:`•`}),(0,W.jsxs)(`span`,{className:`text-primary font-bold`,children:[`Sem `,e.semesterId?.number||`N/A`]})]})]})}),(0,W.jsx)(y,{className:`hidden sm:table-cell`,children:(0,W.jsx)(E,{variant:`outline`,className:`bg-muted/30 border-primary/20 text-primary dark:border-primary/30 dark:text-primary border-2 font-mono font-bold`,children:e.regulation||`General`})}),(0,W.jsx)(y,{className:`hidden sm:table-cell`,children:(0,W.jsxs)(`div`,{className:`font-roboto flex items-center gap-2 text-sm font-medium`,children:[(0,W.jsx)(s,{className:`text-muted-foreground h-4 w-4`}),e.academicYear||`Ongoing`]})}),(0,W.jsx)(y,{className:`text-right`,children:(0,W.jsxs)(M,{children:[(0,W.jsx)(k,{asChild:!0,children:(0,W.jsx)(ne,{variant:`ghost`,className:`hover:bg-muted/50 h-9 w-9 rounded-md border-2 p-0 transition-colors`,children:(0,W.jsx)(f,{className:`h-4 w-4`})})}),(0,W.jsxs)(j,{align:`end`,className:`font-roboto w-56 border-2 p-2 shadow-none`,children:[(0,W.jsx)(A,{className:`text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase`,children:`Offering Controls`}),(0,W.jsx)(N,{className:`my-1 border-b`}),(0,W.jsxs)(D,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:[(0,W.jsx)(c,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`View Syllabus`})]}),(0,W.jsxs)(D,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:[(0,W.jsx)(l,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`text-primary font-medium`,children:`Learning Materials`})]}),(0,W.jsx)(N,{className:`my-1 border-b`}),(0,W.jsxs)(D,{className:`text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>r?.(e.id),children:[(0,W.jsx)(d,{className:`text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-bold`,children:`Withdraw Offering`})]})]})]})})]},e.id))})]})}),t&&t.pages>1&&(0,W.jsx)(re,{className:`flex-col items-start gap-4 border-t-2 pt-6 sm:flex-row sm:items-center`,children:(0,W.jsx)(B,{className:`mx-0 w-auto justify-start`,children:(0,W.jsxs)(L,{children:[(0,W.jsx)(I,{children:(0,W.jsx)(z,{href:t.current>1?`?page=${t.current-1}`:`#`,className:t.current===1?`pointer-events-none opacity-50`:`border-2`})}),[...Array(t.pages)].map((e,n)=>{let r=n+1;return r===1||r===t.pages||r>=t.current-1&&r<=t.current+1?(0,W.jsx)(I,{children:(0,W.jsx)(P,{href:`?page=${r}`,isActive:r===t.current,className:`font-roboto border-2 font-bold`,children:r})},r):null}),(0,W.jsx)(I,{children:(0,W.jsx)(R,{href:t.current<t.pages?`?page=${t.current+1}`:`#`,className:t.current===t.pages?`pointer-events-none opacity-50`:`border-2`})})]})})})]})}var W,G=e((()=>{W=t(n(),1),r(),p(),b(),O(),m(),F(),te(),T(),V(),U.__docgenInfo={description:``,methods:[],displayName:`OfferingsTableView`,props:{offerings:{defaultValue:{value:`[]`,computed:!1},required:!1},loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),K,q,J,Y,X,Z,Q,$;e((()=>{G(),a(),K={title:`Studio/Academics/OfferingsTable`,component:U,tags:[`autodocs`],parameters:{layout:`fullscreen`},argTypes:{offerings:{control:`object`,description:`List of subject offerings to display`},pagination:{control:`object`,description:`Pagination state`},search:{control:`text`,description:`Search query for filtering offerings`},loading:{control:`boolean`,description:`Loading state of the table`,table:{defaultValue:{summary:`false`}}},onDelete:{description:`Callback when an offering is withdrawn`}},args:{onDelete:i(),search:``}},q=[{id:`65f1a2b3c4d5e6f7a8b9c0d1`,subjectId:{name:`Data Structures`,subjectCode:`CS301`},universityId:{name:`University of Mumbai`,shortName:`MU`},branchId:{name:`Computer Engineering`,shortName:`COMP`},semesterId:{number:3},regulation:`R2019`,academicYear:`2023-24`},{id:`65f1a2b3c4d5e6f7a8b9c0d2`,subjectId:{name:`Operating Systems`,subjectCode:`CS401`},universityId:{name:`University of Mumbai`,shortName:`MU`},branchId:{name:`Computer Engineering`,shortName:`COMP`},semesterId:{number:4},regulation:`R2019`,academicYear:`2023-24`},{id:`65f1a2b3c4d5e6f7a8b9c0d3`,subjectId:{name:`Mathematics-III`,subjectCode:`MA301`},universityId:{name:`IIT Bombay`,shortName:`IITB`},branchId:{name:`Mechanical Engineering`,shortName:`MECH`},semesterId:{number:3},regulation:`2022`,academicYear:`2024-25`}],J={args:{offerings:q,pagination:{total:3,pages:1,current:1},loading:!1}},Y={args:{offerings:[],loading:!0}},X={args:{offerings:[],pagination:{total:0,pages:0,current:0},loading:!1}},Z={args:{offerings:q,pagination:{total:30,pages:10,current:1},loading:!1}},Q={args:{offerings:[],pagination:{total:0,pages:0,current:0},search:`Quantum Physics`,loading:!1},parameters:{nextjs:{navigation:{query:{search:`Quantum Physics`}}}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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