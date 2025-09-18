import { LitElement, html, css } from "https://unpkg.com/lit-element/lit-element.js?module";

class MijnGordijnenCard extends LitElement {
  static get properties() { return { hass: {}, config: {} }; }

  static get styles() {
    return css`
      ha-card{
        max-width:600px;margin:auto;padding:16px;overflow:hidden;
        background:var(--ha-card-background,var(--card-background-color,#fff));
        border-radius:var(--ha-card-border-radius,16px);
        box-shadow:var(--ha-card-box-shadow,0 2px 6px rgba(0,0,0,.2));
        color:var(--primary-text-color);
        font-family:var(--paper-font-body1_-_font-family,"Segoe UI",Roboto,sans-serif);
      }
      .title{font-size:1.1em;font-weight:600;margin-bottom:12px;text-align:center}
      .global{display:flex;justify-content:center;gap:12px;margin-bottom:16px}
      .row{display:flex;gap:20px}
      .col{flex:1;text-align:center}
      .sub{font-size:.9em;font-weight:600;margin-bottom:8px}

      .icon-btn{
        display:inline-flex;align-items:center;justify-content:center;
        min-width:42px;height:42px;border-radius:12px;
        border:1px solid var(--divider-color,#d0d0d0);
        background:var(--card-background-color);color:var(--primary-text-color);
        cursor:pointer;transition:background .15s,color .15s,border-color .15s,transform .08s
      }
      .icon-btn.primary{border-color:var(--primary-color);color:var(--primary-color)}
      .icon-btn:hover{background:var(--primary-color);color:#fff;border-color:var(--primary-color);transform:scale(1.05)}

      /* ---- Custom Slider (Mushroom-look) ---- */
      .slider{position:relative;height:28px;user-select:none;touch-action:none}
      .track{
        position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);
        height:6px;border-radius:999px;background:var(--slider-track-color,#d7dadd);
      }
      /* fill links (left curtain) of rechts (right curtain) */
      .fill{
        position:absolute;top:50%;transform:translateY(-50%);
        height:6px;border-radius:999px;background:var(--slider-color,var(--primary-color));
        transition:width .12s ease;
      }
      .fill.left{left:0}
      .fill.right{right:0}

      .thumb{
        position:absolute;top:50%;transform:translate(-50%,-50%);
        width:16px;height:16px;border-radius:50%;
        background:var(--slider-thumb-bg,var(--card-background-color));
        border:2px solid var(--slider-color,var(--primary-color)); /* Mushroom ring */
        transition:transform .08s ease;
        z-index:2; /* blijft binnen card door overflow:hidden op ha-card */
      }
      .slider:hover .thumb{transform:translate(-50%,-50%) scale(1.06)}
    `;
  }

  setConfig(config){
    if(!config.left_entity || !config.right_entity){
      throw new Error("Je moet zowel left_entity als right_entity instellen.");
    }
    this.config = config;
  }

  _clamp(n){ return Math.max(0, Math.min(100, Number(n)||0)); }

  /* ---- Slider helpers ---- */
  _renderSlider(uiVal, side, onChange){
    // uiVal: 0..100, side: "left" | "right"
    const v = this._clamp(uiVal);
    // Curtain-fill: kleur komt van buiten naar binnen
    const fillWidth = (side === "right") ? (100 - v) : v; // rechts: open=100 → 0%, links: open=0 → 0%
    return html`
      <div class="slider"
           @pointerdown=${(e)=>this._startDrag(e, side, v, onChange)}>
        <div class="track"></div>
        <div class="fill ${side}" style="width:${fillWidth}%"></div>
        <div class="thumb" style="left:${v}%"></div>
      </div>
    `;
  }

  _startDrag(e, side, current, onChange){
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const move = (clientX)=>{
      const x = this._clamp(((clientX - rect.left) / rect.width) * 100);
      onChange(x, side, slider);
    };
    const onPointerMove = (ev)=>{ ev.preventDefault(); move(ev.clientX); };
    const onPointerUp = ()=>{
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
    move(e.clientX);
    window.addEventListener('pointermove', onPointerMove, {passive:false});
    window.addEventListener('pointerup', onPointerUp);
  }

  /* ---- Curtain render ---- */
  renderCurtain(entityId, label, isRight=false){
    const st = this.hass.states[entityId];
    if(!st) return html`<div class="col"><div class="sub">${label}</div><div>Entity niet gevonden</div></div>`;

    // HA: 0=dicht (midden), 100=open (buiten)
    const haPos = this._clamp(st.attributes.current_position ?? 0);
    // UI: links = 100 - haPos (open=0%), rechts = haPos (open=100%)
    const uiVal = isRight ? haPos : (100 - haPos);

    const onChange = (x, side, sliderEl)=>{
      const v = this._clamp(x);
      const newHa = isRight ? v : (100 - v);
      this._setPosition(entityId, newHa);
      // Live visuals updaten
      const fill = sliderEl.querySelector('.fill');
      const thumb = sliderEl.querySelector('.thumb');
      if (thumb) thumb.style.left = `${v}%`;
      const fillWidth = isRight ? (100 - v) : v;
      if (fill) fill.style.width = `${fillWidth}%`;
    };

    return html`
      <div class="col">
        <div class="sub">${label}</div>
        ${this._renderSlider(uiVal, isRight ? "right" : "left", onChange)}
        <div class="global" style="margin-top:10px;gap:10px;">
          ${isRight
            ? html`
                <button class="icon-btn" title="Dicht (links)"  @click=${()=>this._setPosition(entityId,0)}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <button class="icon-btn primary" title="Open (rechts)" @click=${()=>this._setPosition(entityId,100)}><ha-icon icon="mdi:arrow-right"></ha-icon></button>
              `
            : html`
                <button class="icon-btn primary" title="Open (links)" @click=${()=>this._setPosition(entityId,100)}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <button class="icon-btn" title="Dicht (rechts)" @click=${()=>this._setPosition(entityId,0)}><ha-icon icon="mdi:arrow-right"></ha-icon></button>
              `
          }
        </div>
      </div>
    `;
  }

  render(){
    const title = this.config.name || "Gordijnen";
    return html`
      <ha-card>
        <div class="title">${title}</div>

        <div class="global">
          <button class="icon-btn primary" title="Alles open" @click=${this._openAll}><ha-icon icon="mdi:arrow-expand-horizontal"></ha-icon></button>
          <button class="icon-btn" title="Alles dicht" @click=${this._closeAll}><ha-icon icon="mdi:arrow-collapse-horizontal"></ha-icon></button>
          ${this.config.door_position !== undefined ? html`
            <button class="icon-btn" title="Deurstand (rechts)" @click=${this._doorRight}><ha-icon icon="mdi:door-open"></ha-icon></button>
          `:''}
        </div>

        <div class="row">
          ${this.renderCurtain(this.config.left_entity,"Links",false)}
          ${this.renderCurtain(this.config.right_entity,"Rechts",true)}
        </div>
      </ha-card>
    `;
  }

  _setPosition(id,pos){
    this.hass.callService("cover","set_cover_position",{entity_id:id,position:this._clamp(pos)});
  }
  _openAll = ()=>{ this._setPosition(this.config.left_entity,100); this._setPosition(this.config.right_entity,100); }
  _closeAll = ()=>{ this._setPosition(this.config.left_entity,0);   this._setPosition(this.config.right_entity,0); }
  _doorRight = ()=>{
    const p = this._clamp(this.config.door_position ?? 50);
    this._setPosition(this.config.right_entity, p); // alleen rechter gordijn
  }

  getCardSize(){ return 3; }
}

if(!customElements.get("mijn-gordijnen-card")){
  customElements.define("mijn-gordijnen-card",MijnGordijnenCard);
}
