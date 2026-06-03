/* Ecowave Admin — Vehicles management view */
function Vehicles() {
  const A = window.ADMIN;
  const [list, setList] = useState(A.vehicles);
  const [edit, setEdit] = useState(null);

  async function flip(id) {
    const v = list.find(x => x.id === id);
    const next = !v.active;
    setList(list.map(x => x.id === id ? { ...x, active: next } : x));
    try { await window.DB.updateVehicle(id, { active: next }); toast(next ? "Véhicule rendu disponible" : "Véhicule masqué du site"); }
    catch (e) { toast("Erreur — réessayez"); }
  }
  async function save(data) {
    setList(list.map(v => v.id === data.id ? { ...v, ...data } : v));
    try {
      await window.DB.updateVehicle(data.id, { name: data.name, trim: data.trim, day: data.day, weekend: data.weekend, week: data.week, deposit: data.deposit, kmDay: data.kmDay, extraKm: data.extraKm });
      toast(`${data.name} mis à jour`);
    } catch (e) { toast("Erreur — réessayez"); }
    setEdit(null);
  }

  return (
    <div className="view show">
      <div className="sec-title">
        <div><h2>Véhicules</h2><div className="sub">{list.length} véhicules · {list.filter(v => v.active).length} en ligne</div></div>
        <button className="btn-add btn-green" onClick={() => toast("Formulaire d'ajout de véhicule")}><Icon name="plus" />Ajouter un véhicule</button>
      </div>

      {list.map(v => (
        <div className="vrow" key={v.id}>
          <img className="photo" src={v.photo} alt={v.name} />
          <div className="info">
            <h3>{v.name}</h3>
            <div className="badges"><span className="vbadge amg">{v.trim}</span><span className="vbadge cat">{v.cat}</span></div>
            <div className="priceline">
              <div className="priceitem">24h<b>{eur(v.day)}</b></div>
              <div className="priceitem">Weekend<b>{eur(v.weekend)}</b></div>
              <div className="priceitem">Semaine<b>{v.week ? eur(v.week) : "—"}</b></div>
              <div className="priceitem">Caution<b>{eur(v.deposit)}</b></div>
              <div className="priceitem">Km/jour<b>{v.kmDay}</b></div>
            </div>
          </div>
          <div className="vactions">
            <div className="statusctl">
              <span className={"statustxt " + (v.active ? "on" : "off")}>{v.active ? "Disponible" : "Masqué"}</span>
              <div className={"toggle" + (v.active ? " on" : "")} onClick={() => flip(v.id)}><div className="knob"></div></div>
            </div>
            <button className="btn-ghost" onClick={() => setEdit(v)}><Icon name="pencil" />Modifier</button>
          </div>
        </div>
      ))}

      {edit && <VehicleModal v={edit} onClose={() => setEdit(null)} onSave={save} />}
    </div>
  );
}

function VehicleModal({ v, onClose, onSave }) {
  const [f, setF] = useState(v);
  const set = (k, num) => (e) => setF({ ...f, [k]: num ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value });
  return (
    <div className="overlay show" onClick={e => { if (e.target.classList.contains("overlay")) onClose(); }}>
      <div className="modal">
        <div className="modal-head"><h3>Modifier — {f.name}</h3><button className="x" onClick={onClose}><Icon name="x" /></button></div>
        <div className="modal-body">
          <div className="grid2">
            <div className="ff"><label>Nom</label><div className="inp"><input value={f.name} onChange={set("name")} /></div></div>
            <div className="ff"><label>Finition</label><div className="inp"><input value={f.trim} onChange={set("trim")} /></div></div>
            <div className="ff"><label>Prix / 24h</label><div className="inp"><span className="cur">€</span><input type="number" value={f.day} onChange={set("day", true)} /></div></div>
            <div className="ff"><label>Weekend</label><div className="inp"><span className="cur">€</span><input type="number" value={f.weekend} onChange={set("weekend", true)} /></div></div>
            <div className="ff"><label>Semaine</label><div className="inp"><span className="cur">€</span><input type="number" value={f.week || ""} placeholder="Sur demande" onChange={set("week", true)} /></div></div>
            <div className="ff"><label>Caution</label><div className="inp"><span className="cur">€</span><input type="number" value={f.deposit} onChange={set("deposit", true)} /></div></div>
            <div className="ff"><label>Km / jour inclus</label><div className="inp"><input type="number" value={f.kmDay} onChange={set("kmDay", true)} /></div></div>
            <div className="ff"><label>Prix km supplémentaire</label><div className="inp"><span className="cur">€</span><input type="number" step="0.01" value={f.extraKm ?? ""} placeholder="À préciser" onChange={set("extraKm", true)} /></div></div>
          </div>
        </div>
        <div className="modal-foot"><button className="btn-ghost" onClick={onClose}>Annuler</button><button className="btn-add btn-green" onClick={() => onSave(f)}><Icon name="check" />Enregistrer</button></div>
      </div>
    </div>
  );
}
Object.assign(window, { Vehicles, VehicleModal });
