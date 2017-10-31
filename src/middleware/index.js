import { Router } from 'express';

let hasPermission = (req) => {

	return false;
};

export default ({ config, db }) => {
	let routes = Router();

	routes.use((req, res, next) => {
		console.log('req.originalUrl', req.originalUrl);
        console.log('req.baseUrl', req.baseUrl);
        console.log('req.path', req.path);
        if(hasPermission(req)){
        	next();
		}else{
        	res.status(401).send(''
				+ 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
            	+ 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdyyyydNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsydNNNNdyymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsymNmsoosmNNysmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsymMdo:----:omNmysmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmyymNmo:--------:omMmyymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmyymMmo:------------:omNmyymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmyymNmo:----------------:omNmyymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmysmNms:--------------------:smNmyymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmysmNms:------------------------:smNmsymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNmysdNms:----------------------------:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNmysdNms:--------------------------------:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNmhsdNms:--------------------------------:---:smNdshmNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNmhsdNmy:---------------------------------:y-----:ymNdshmNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNmhsdNmy/---:-----------------o:------------/d-------/yNNdshmNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNmhsdNNy/----:ds:--------------:Nh------------/d---------/yNNdshNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNhshNNy/-------+s:--------------sMMo-----------/m-----------/yNNhshNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNhshNNy/----------y----------/+ossNMMNyhyyo------+m:------------/yNNhshNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNdshNNh/------------o:--:-----:+oosdMMMMy+/:----:::sd/--------------/hNNhsdNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNdshNNh/--------------sh/+mds+::::://mMMMMd/::/+shmN:++-----------------/hNNhsdNNNNNNNNNNN\n'
                + 'NNNNNNNNNdshNNh/-----------------s--hMMMNNNNMMMMMMMMMMNNNMMMMM/---------------------/hNNhsdNNNNNNNNN\n'
                + 'NNNNNNNdsyNNh/-------------------o:-+MNNmdhydMMMMMMMMN//+shmNN/-----------------------/hNNhsdNNNNNNN\n'
                + 'NNNNNmoyNNh/---------------------:o-:+:------yMMMMMMMN:-----:/--------------------------/hNNysNNNNNN\n'
                + 'NNNNNodMN+------------------------s----------hMMMMMMMMs-----------------------------------+NMdoNNNNN\n'
                + 'NNNNN/MMs-------------------------++--------:MMMMMMMMMN:-----------------------------------sMM/NNNNN\n'
                + 'NNNNNodMm+-------------------------s--------yMMMMMMMMMMd----------------------------------+NMdoNNNNN\n'
                + 'NNNNNNoyNNh/-----------------------s:------/NMMMMMMMMMMM+-------------------------------/dNNyomNNNNN\n'
                + 'NNNNNNNdoyNNh/---------------------:o------dMMMMMMMMMMMMm:----------------------------/hNNysdNNNNNNN\n'
                + 'NNNNNNNNNdohNNh/--------------------y-----+MMMMMMMMMMMMMMy--------------------------/hNNhsdNNNNNNNNN\n'
                + 'NNNNNNNNNNNhshNNh/------------------+:---:mMMMMMMMMMMMMMMN+-----------------------/hNNhsdNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNhshNNh/---------------------:++hmmh+oooymmsoo/---------------------/hNNhsdNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNhshNNy/-----------------------::------::-----------------------/hNNhshNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNmhshNNy/-------//-/::++/---:++/:/-/::++::++/-/++::++:-------/yNNhshNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNmhsdNNy/-----ydod/hs:ho--shsh/d-yosdo:sy/d+hho:sys/-----/yNNdshmNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNmhsdNNy/---sood/os+y/--ss/::h+h/oho/oyoy/yyo:+oh+---/yNNdshmNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNmhsdNNy:-:--:--::----------::--::--::--:::--::--:yNNdshmNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNmysdNms:-------/hoy:yh:-yso-:yy-:hoy--------:ymNdshmNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNmysdNms:-----+moysdyh-ssh:yhhy/mod:-----:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNmysdNms:---:+--o/:o:++o:o::o:o-o:---:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmysdNms:------------------------:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmysmNms:--------------------:smNdsymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmysmMmo:----------------:smNmsymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmyymNmo:------------:omNmsymNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsymMmo:--------:omNmssmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsymMmo:----:omMmssmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmsymNmsoosmNmssmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdsydmNNmdysmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdhyyhdNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN\n'
                + 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
		}
	});

	return routes;
}
