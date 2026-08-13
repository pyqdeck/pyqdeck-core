import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,Gr as ee,Hr as i,Kr as te,Wr as ne}from"./iframe-DLhurhNv.js";import{n as a,r as o}from"./dist-BvuEP38C.js";import{A as re,F as s,Y as c,dt as ie,f as ae,lt as l,nt as oe,t as u}from"./lucide-react-Bi-kln-I.js";import{r as d,t as f}from"./button-BuQv-gmV.js";import{a as se,c as p,r as m,t as h}from"./card-E7-ymhVf.js";import{t as ce}from"./link-D_Mw6Pkq.js";import{c as g,i as _,l as le,n as v,o as y,s as b,t as x}from"./table-BMPDpjQN.js";import{a as S,g as ue,u as C}from"./dropdown-menu-rGOn6bC-.js";import{a as de,c as w,i as T,n as E,o as D,r as O,s as k,t as A}from"./pagination-BfSJHDJS.js";import{n as j,t as M}from"./badge-2pAjUm4e.js";import{n as N,t as P}from"./skeleton-YUITohrn.js";import{a as F,i as I,o as L,r as R,s as z,t as fe}from"./empty-DLYVRgW0.js";import{n as B,t as V}from"./dropdown-action-CVIuvxbo.js";import{o as pe,r as me,s as he,t as ge}from"./avatar-CdriOsL8.js";function H({universities:e=[],pagination:t,onEdit:n,onDelete:r,loading:i=!1}){let a=te(),o=a?.get(`search`)||``,u=ee(),d=ne();return i?(0,U.jsx)(h,{className:`border-border/50 overflow-hidden border py-0 shadow-none`,children:(0,U.jsx)(m,{className:`p-0`,children:(0,U.jsxs)(x,{children:[(0,U.jsx)(b,{children:(0,U.jsxs)(g,{className:`bg-muted/30 border-b hover:bg-transparent`,children:[(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Institution`}),(0,U.jsx)(y,{className:`text-foreground font-roboto hidden h-12 px-6 font-bold sm:table-cell`,children:`Location`}),(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Status`}),(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold`,children:`Actions`})]})}),(0,U.jsx)(v,{children:[1,2,3,4,5].map(e=>(0,U.jsxs)(g,{children:[(0,U.jsx)(_,{className:`px-6 py-4`,children:(0,U.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,U.jsx)(P,{className:`h-12 w-12 rounded-lg`}),(0,U.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,U.jsx)(P,{className:`h-5 w-40`}),(0,U.jsx)(P,{className:`h-3 w-20`})]})]})}),(0,U.jsx)(_,{className:`hidden px-6 py-4 sm:table-cell`,children:(0,U.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,U.jsx)(P,{className:`h-4 w-24`}),(0,U.jsx)(P,{className:`h-3 w-16`})]})}),(0,U.jsx)(_,{className:`px-6 py-4`,children:(0,U.jsx)(P,{className:`h-6 w-16 rounded-full`})}),(0,U.jsx)(_,{className:`px-6 py-4 text-right`,children:(0,U.jsx)(P,{className:`ml-auto h-9 w-9 rounded-md`})})]},e))})]})})}):(0,U.jsxs)(h,{className:`border-border/50 overflow-hidden border py-0 shadow-none`,children:[(0,U.jsx)(m,{className:`overflow-x-auto p-0`,children:(0,U.jsxs)(x,{className:`min-w-[500px]`,children:[(0,U.jsx)(b,{children:(0,U.jsxs)(g,{className:`bg-muted/30 border-b hover:bg-transparent`,children:[(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Institution`}),(0,U.jsx)(y,{className:`text-foreground font-roboto hidden h-12 px-6 font-bold sm:table-cell`,children:`Location`}),(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Status`}),(0,U.jsx)(y,{className:`text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold`,children:`Actions`})]})}),(0,U.jsx)(v,{children:e.length===0?(0,U.jsx)(g,{children:(0,U.jsx)(_,{colSpan:4,className:`h-72 p-0`,children:(0,U.jsxs)(fe,{className:`border-0 shadow-none`,children:[(0,U.jsxs)(I,{children:[(0,U.jsx)(F,{variant:`icon`,children:(0,U.jsx)(re,{className:`size-4`})}),(0,U.jsx)(L,{className:`text-lg`,children:o?`No matching universities`:`No universities found`}),(0,U.jsx)(R,{children:o?`We couldn't find any results for "${o}". Try adjusting your filters or search term.`:`Add your first institution to start managing your academic database.`})]}),o&&(0,U.jsx)(f,{variant:`outline`,onClick:()=>{let e=new URLSearchParams(a?.toString()||``);e.delete(`search`),e.set(`page`,`1`),u.push(`${d}?${e.toString()}`)},className:`mt-2 border`,children:`Clear Search`})]})})}):e.map(e=>(0,U.jsxs)(g,{className:`group border-b`,children:[(0,U.jsx)(_,{className:`px-6 py-4`,children:(0,U.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,U.jsxs)(ge,{className:`border-muted bg-muted/50 size-12 rounded-lg border after:rounded-lg`,children:[(0,U.jsx)(pe,{src:e.logo,alt:e.name,className:`rounded-lg object-contain`}),(0,U.jsx)(me,{className:`rounded-lg text-lg font-bold`,children:e.name.charAt(0)})]}),(0,U.jsxs)(`div`,{className:`flex min-w-0 flex-col`,children:[(0,U.jsxs)(`span`,{className:`text-foreground group-hover:text-primary font-roboto flex items-center gap-1.5 truncate font-bold transition-colors`,children:[e.name,e.websiteUrl&&(0,U.jsx)(W.default,{href:e.websiteUrl,target:`_blank`,className:`text-muted-foreground hover:text-primary transition-colors`,children:(0,U.jsx)(l,{className:`size-3`})})]}),(0,U.jsxs)(`div`,{className:`flex items-center gap-2 leading-none`,children:[(0,U.jsx)(`span`,{className:`text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase`,children:e.shortName}),(0,U.jsx)(`span`,{className:`text-muted-foreground/30`,children:`•`}),(0,U.jsxs)(`span`,{className:`text-muted-foreground font-roboto text-xs lowercase`,children:[`/`,e.slug]})]})]})]})}),(0,U.jsx)(_,{className:`hidden px-6 py-4 sm:table-cell`,children:(0,U.jsxs)(`div`,{className:`flex flex-col`,children:[(0,U.jsx)(`span`,{className:`text-foreground font-roboto text-sm font-semibold`,children:e.state||`N/A`}),(0,U.jsx)(`span`,{className:`text-muted-foreground font-roboto text-xs`,children:e.country||`India`})]})}),(0,U.jsx)(_,{className:`px-6 py-4`,children:(0,U.jsx)(M,{variant:e.isActive===!1?`secondary`:`default`,className:`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${e.isActive===!1?`bg-muted text-muted-foreground`:`bg-success/10 text-success hover:bg-success/10`}`,children:e.isActive===!1?`Inactive`:`Active`})}),(0,U.jsx)(_,{className:`px-6 py-4 text-right`,children:(0,U.jsxs)(V,{label:`Management`,trigger:(0,U.jsxs)(f,{variant:`ghost`,className:`hover:bg-muted/50 size-9 border p-0 transition-colors`,children:[(0,U.jsx)(`span`,{className:`sr-only`,children:`Open menu`}),(0,U.jsx)(ie,{className:`size-4`})]}),children:[(0,U.jsxs)(S,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>n(e),children:[(0,U.jsx)(s,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,U.jsx)(`span`,{className:`font-medium`,children:`Edit University`})]}),e.websiteUrl&&(0,U.jsx)(S,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,U.jsxs)(W.default,{href:e.websiteUrl,target:`_blank`,rel:`noopener noreferrer`,className:`flex w-full items-center`,children:[(0,U.jsx)(l,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,U.jsx)(`span`,{className:`font-medium`,children:`Visit Website`})]})}),(0,U.jsx)(C,{className:`my-1 border-b`}),(0,U.jsx)(S,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,U.jsxs)(W.default,{href:`/studio/branches?universityId=${e.id}`,className:`flex w-full items-center`,children:[(0,U.jsx)(c,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,U.jsx)(`span`,{className:`text-primary font-medium`,children:`View Branches`})]})}),(0,U.jsx)(S,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,U.jsxs)(W.default,{href:`/studio/semesters?universityId=${e.id}`,className:`flex w-full items-center`,children:[(0,U.jsx)(oe,{className:`text-muted-foreground group-hover:text-warning mr-3 size-4 transition-colors`}),(0,U.jsx)(`span`,{className:`text-warning font-medium`,children:`View Semesters`})]})}),(0,U.jsx)(C,{className:`my-1 border-b`}),(0,U.jsxs)(S,{className:`text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>r(e),children:[(0,U.jsx)(ae,{className:`text-destructive/70 group-hover:text-destructive mr-3 size-4 transition-colors`}),(0,U.jsx)(`span`,{className:`font-bold`,children:`Delete Institution`})]})]})})]},e.id))})]})}),t&&t.pages>1&&(0,U.jsxs)(se,{className:`flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center`,children:[(0,U.jsx)(A,{className:`mx-0 w-auto justify-start`,children:(0,U.jsxs)(E,{children:[(0,U.jsx)(T,{children:(0,U.jsx)(k,{href:t.current>1?`?page=${t.current-1}`:`#`,className:t.current===1?`pointer-events-none opacity-50`:`border`})}),[...Array(t.pages)].map((e,n)=>{let r=n+1;return r===1||r===t.pages||r>=t.current-1&&r<=t.current+1?(0,U.jsx)(T,{children:(0,U.jsx)(de,{href:`?page=${r}`,isActive:r===t.current,className:`font-roboto border font-bold`,children:r})},r):r===t.current-2||r===t.current+2?(0,U.jsx)(T,{children:(0,U.jsx)(O,{})},r):null}),(0,U.jsx)(T,{children:(0,U.jsx)(D,{href:t.current<t.pages?`?page=${t.current+1}`:`#`,className:t.current===t.pages?`pointer-events-none opacity-50`:`border`})})]})}),(0,U.jsxs)(`div`,{className:`text-muted-foreground font-roboto text-sm sm:ml-auto`,children:[`Showing`,` `,(0,U.jsx)(`span`,{className:`text-foreground font-bold`,children:(t.current-1)*10+1}),` `,`to`,` `,(0,U.jsx)(`span`,{className:`text-foreground font-bold`,children:Math.min(t.current*10,t.total)}),` `,`of`,` `,(0,U.jsx)(`span`,{className:`text-foreground font-bold`,children:t.total}),` `,`entries`]})]})]})}var U,W,_e=e((()=>{U=t(n(),1),r(),i(),W=t(ce(),1),B(),ue(),u(),p(),le(),he(),j(),d(),N(),z(),w(),H.__docgenInfo={description:``,methods:[],displayName:`UniversitiesTableView`,props:{universities:{defaultValue:{value:`[]`,computed:!1},required:!1},loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),G,K,q,J,Y,X,Z,Q,$;e((()=>{_e(),o(),G={title:`Studio/Universities/UniversitiesTable`,component:H,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"The `UniversitiesTableView` component provides a tabular view of academic institutions.\nIt supports loading states, empty states, searching, and pagination."}}},argTypes:{universities:{control:`object`,description:`Array of university objects to display`,table:{type:{summary:`array`,detail:`Array<{ id: string, name: string, shortName: string, slug: string, logo?: string, state?: string, country?: string, websiteUrl?: string, isActive: boolean }>`},defaultValue:{summary:`[]`}}},pagination:{control:`object`,description:`Pagination state object`,table:{type:{summary:`object`,detail:`{ total: number, pages: number, current: number }`}}},onEdit:{action:`onEdit`,description:`Callback when edit button is clicked`,table:{type:{summary:`(university: object) => void`}}},onDelete:{action:`onDelete`,description:`Callback when delete button is clicked`,table:{type:{summary:`(university: object) => void`}}},loading:{control:`boolean`,description:`Whether the table is in a loading state`,table:{defaultValue:{summary:`false`}}}},args:{onEdit:a(),onDelete:a()}},K=[{id:`64f1a2b3c4d5e6f7a8b9c0d1`,name:`University of Mumbai`,shortName:`MU`,slug:`mumbai-university`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Mumbai_logo.png/220px-University_of_Mumbai_logo.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://mu.ac.in`,isActive:!0},{id:`64f1a2b3c4d5e6f7a8b9c0d2`,name:`Delhi University`,shortName:`DU`,slug:`delhi-university`,logo:``,state:`Delhi`,country:`India`,websiteUrl:`https://du.ac.in`,isActive:!0},{id:`64f1a2b3c4d5e6f7a8b9c0d3`,name:`Indian Institute of Technology Bombay`,shortName:`IITB`,slug:`iit-bombay`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://iitb.ac.in`,isActive:!0},{id:`64f1a2b3c4d5e6f7a8b9c0d4`,name:`Savitribai Phule Pune University`,shortName:`SPPU`,slug:`pune-university`,logo:``,state:`Maharashtra`,country:`India`,websiteUrl:`https://unipune.ac.in`,isActive:!1}],q={args:{universities:K,pagination:{total:4,pages:1,current:1},loading:!1}},J={args:{universities:[],loading:!0}},Y={args:{universities:K,pagination:{total:45,pages:5,current:2},loading:!1}},X={args:{universities:[K[0]],pagination:{total:1,pages:1,current:1},loading:!1},parameters:{nextjs:{navigation:{query:{search:`Mumbai`}}}}},Z={args:{universities:[],pagination:{total:0,pages:0,current:0},loading:!1}},Q={args:{universities:[],pagination:{total:0,pages:0,current:0},loading:!1},parameters:{nextjs:{navigation:{query:{search:`Something that does not exist`}}}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    universities: mockUniversities,
    pagination: {
      total: 4,
      pages: 1,
      current: 1
    },
    loading: false
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [],
    loading: true
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    universities: mockUniversities,
    pagination: {
      total: 45,
      pages: 5,
      current: 2
    },
    loading: false
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [mockUniversities[0]],
    pagination: {
      total: 1,
      pages: 1,
      current: 1
    },
    loading: false
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Mumbai'
        }
      }
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    loading: false
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    loading: false
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Something that does not exist'
        }
      }
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Loading`,`WithPagination`,`Searching`,`Empty`,`NoResults`]}))();export{q as Default,Z as Empty,J as Loading,Q as NoResults,X as Searching,Y as WithPagination,$ as __namedExportsOrder,G as default};