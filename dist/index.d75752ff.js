class t{constructor(t,s,e){this.image=t,this.shape=s,this.offset=e}draw(t){t.save(),this.shape.createPath(t),t.clip(),t.drawImage(this.image,-this.offset.x,-this.offset.y),t.restore()}}const s={x:0,y:0};class e{constructor(t,s,e,i){this.slot=t,this.clip=s,this.offset=e,this.rotation=i}draw(t){t.save(),t.translate(this.offset.x,this.offset.y),t.rotate(this.rotation),this.clip.draw(t),t.restore()}drawHovered(t){t.save(),t.translate(this.offset.x,this.offset.y),t.rotate(this.rotation),this.clip.shape.createPath(t),t.fillStyle="#fff4",t.fill(),t.restore()}isPointInside(t){return s.x=t.x-this.offset.x,s.y=t.y-this.offset.y,this.clip.shape.isPointInside(s)}}class i{constructor(t){this.points=t;let s=0,e=0,i=0,o=0;for(const n of t)s=Math.min(n.x,s),e=Math.max(n.x,e),i=Math.min(n.y,i),o=Math.max(n.y,o);this.width=e-s,this.height=o-i}scale(t){for(const s of this.points)s.x*=t,s.y*=t;this.width*=t,this.height*=t}createPath(t){t.beginPath();const s=this.points[0];t.moveTo(s.x,s.y);for(let s=1;s<this.points.length;s++){const e=this.points[s];t.lineTo(e.x,e.y)}t.closePath()}isPointInside(t){let s=0,e=this.points[this.points.length-1];for(const i of this.points){const o=(i.y-e.y)/(i.x-e.x),n=i.y-o*i.x,h=t.x*o+n,c=i.x<=t.x||e.x<=t.x,f=i.x>=t.x||e.x>=t.x,r=c&&f;h>=t.y&&r&&(s+=1),e=i}return s%2==1}}const o=["CENTER","TOP_RIGHT","TOP_LEFT"],n=["CENTER","LEFT","BOTTOM_LEFT"],h=["CENTER","BOTTOM_RIGHT","RIGHT"],c=[o,n,h];function f(t){return o.includes(t)?o:n.includes(t)?n:h}function r(t,s){return t.map((t=>s.find((s=>s.slot==t))))}function a(t,s){const e=r(t,s),i=e[e.length-1];let o=i.slot,n=i.offset;for(const t of e){const s=t.slot,e=t.offset;t.slot=o,t.offset=n,t.rotation+=2*Math.PI/3,o=s,n=e}}const l=document.getElementById("base-image"),d=new class extends i{constructor(t){const s=60*Math.PI/180,e=.5*Math.sin(s);super([{x:0,y:-.5},{x:e,y:-.25},{x:e,y:.25},{x:0,y:.5},{x:-e,y:.25},{x:-e,y:-.25}]),this.scale(t)}}(170);const x=document.querySelector("canvas"),y=x.getContext("2d"),u=new class{constructor(s){this.mouse={x:0,y:0},this.clicked=!1,s.onmousedown=()=>{this.clicked=!0},s.onmousemove=t=>{const e=s.getBoundingClientRect(),i=s.width/e.width,o=s.height/e.height;this.mouse.x=(t.x-e.left)*i,this.mouse.y=(t.y-e.top)*o},this.pieces=[new e("TOP_LEFT",new t(l,d,{x:440,y:100}),{x:d.width,y:.5*d.height},0),new e("TOP_RIGHT",new t(l,d,{x:586,y:100}),{x:2*d.width,y:.5*d.height},0),new e("LEFT",new t(l,d,{x:366,y:227}),{x:.5*d.width,y:1.25*d.height},0),new e("CENTER",new t(l,d,{x:513,y:227}),{x:1.5*d.width,y:1.25*d.height},0),new e("RIGHT",new t(l,d,{x:660,y:227}),{x:2.5*d.width,y:1.25*d.height},0),new e("BOTTOM_LEFT",new t(l,d,{x:439,y:354}),{x:d.width,y:2*d.height},0),new e("BOTTOM_RIGHT",new t(l,d,{x:586,y:353}),{x:2*d.width,y:2*d.height},0)];const i=3*d.width,o=2.5*d.height,n=(s.width-i)/2,h=(s.height-o)/2;for(const t of this.pieces)t.offset.x+=n,t.offset.y+=h;const c=this.pieces[0];this.backgroundOffset={x:c.offset.x-c.clip.offset.x,y:c.offset.y-c.clip.offset.y}}shuffle(t){for(let s=0;s<t;s++){const t=Math.floor(Math.random()*c.length);a(c[t],this.pieces)}}update(t){if(!this.clicked)return;this.clicked=!1;const s=this.pieces.find((t=>t.isPointInside(this.mouse)));if(s&&"CENTER"!=s.slot){a(f(s.slot),this.pieces)}}render(t,s){s.drawImage(l,this.backgroundOffset.x,this.backgroundOffset.y);for(const t of this.pieces)t.draw(s);const e=this.pieces.find((t=>t.isPointInside(this.mouse)));if(e&&"CENTER"!=e.slot){const t=r(f(e.slot),this.pieces);for(const e of t)e.drawHovered(s)}}}(x);let w;function p(t){if(null==w)return w=t,void requestAnimationFrame(p);const s=(t-w)/1e3;w=t,u.update(s),u.render(x,y),requestAnimationFrame(p)}window.addEventListener("load",(function(){p(0)})),document.getElementById("shuffle-button").onclick=function(){const t=document.getElementById("shuffle-input");u.shuffle(parseInt(t.value))};
//# sourceMappingURL=index.d75752ff.js.map
