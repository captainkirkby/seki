//list of rnews predefined attributes
var rnews_properties=["rnews:alternativeHeadline","rnews:copyrightNotice","rnews:copyrightYear","rnews:dateCreated","rnews:dateline",
		"rnews:dateModified","rnews:datePublished","rnews:description","rnews:genre","rnews:headline","rnews:identifier",
		"rnews:inLanguage","rnews:publishingPrinciples","rnews:usageTerms","rnews:version","rnews:articleBody",
		"rnews:articleSection","rnews:printColumn","rnews:printEdition","rnews:printPage","rnews:printSection","rnews:wordCount",
		"rnews:encodingFormat","rnews:height","rnews:width","rnews:duration","rnews:transcript","rnews:commentText",
		"rnews:commentTime","rnews:name","rnews:featureCode","rnews:box","rnews:circle","rnews:elevation",
		"rnews:line","rnews:point","rnews:polygon","rnews:additionalName","rnews:familyName","rnews:givenName","rnews:honorificPrefix",
		"rnews:honorificSuffix","rnews:tickerSymbol","rnews:addressCountry","rnews:addressLocality","rnews:addressRegion","rnews:email","rnews:faxNumber"
		,"rnews:postalCode","rnews:streetAddress","rnews:telephone","rnews:postOfficeBoxNumber"];
var rnews_rels=["rnews:discussionUrl","rnews:thumbnailUrl","rnews:replyToUrl","rnews:url"];
var rnews_typeofs=["rnews:PostalAddress","rnews:Place","rnews:Person","rnews:Organization",
                   "rnews:NewsItem","rnews:Article","rnews:ImageObject","rnews:AudioObject","rnews:VideoObject","rnews:UserComments","rnews:Concept", "rnews:GeoCoordinates"];
var rnews_contenttypes=["xsd:string","xsd:double","xsd:anyURI","xsd:dateTime","xsd:integer","xsd:nonNegativeInteger","owl:thing","xsd:duration"];
//list of popular namespace prefixes
var popular_prefixes ={ 
		  "rnews": "http:\/\/www.iptc.org\/std\/rNews\/1.0\/",
		  "foaf": "http:\/\/xmlns.com\/foaf\/0.1\/",
		  "dc": "http:\/\/purl.org\/dc\/elements\/1.1\/",
		  "owl": "http:\/\/www.w3.org\/2002\/07\/owl#",
		  "rdf": "http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#",
		  "rdfs": "http:\/\/www.w3.org\/2000\/01\/rdf-schema#",
		  "dbp": "http:\/\/dbpedia.org\/property\/",
		  "d2rq": "http:\/\/www.wiwiss.fu-berlin.de\/suhl\/bizer\/D2RQ\/0.1#",
		  "swrc": "http:\/\/swrc.ontoware.org\/ontology#",
		  "test2": "http:\/\/this.invalid\/test2#",
		  "skos": "http:\/\/www.w3.org\/2004\/02\/skos\/core#",
		  "sioc": "http:\/\/rdfs.org\/sioc\/ns#",
		  "ex": "http:\/\/example.org\/",
		  "nie": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/01\/19\/nie#",
		  "xhtml": "http:\/\/www.w3.org\/1999\/xhtml\/vocab#",
		  "xsd": "http:\/\/www.w3.org\/2001\/XMLSchema#",
		  "content": "http:\/\/purl.org\/rss\/1.0\/modules\/content\/",
		  "xs": "http:\/\/www.w3.org\/2001\/XMLSchema#",
		  "sioct": "http:\/\/rdfs.org\/sioc\/types#",
		  "exif": "http:\/\/www.w3.org\/2003\/12\/exif\/ns#",
		  "bio": "http:\/\/purl.org\/vocab\/bio\/0.1\/",
		  "rss": "http:\/\/purl.org\/rss\/1.0\/",
		  "geo": "http:\/\/www.w3.org\/2003\/01\/geo\/wgs84_pos#",
		  "dcterms": "http:\/\/purl.org\/dc\/terms\/",
		  "umbel": "http:\/\/umbel.org\/umbel#",
		  "swc": "http:\/\/data.semanticweb.org\/ns\/swc\/ontology#",
		  "rel": "http:\/\/purl.org\/vocab\/relationship\/",
		  "dct": "http:\/\/purl.org\/dc\/terms\/",
		  "xhv": "http:\/\/www.w3.org\/1999\/xhtml\/vocab#",
		  "rev": "http:\/\/purl.org\/stuff\/rev#",
		  "psych": "http:\/\/purl.org\/vocab\/psychometric-profile\/",
		  "void": "http:\/\/rdfs.org\/ns\/void#",
		  "pimo": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/11\/01\/pimo#",
		  "vann": "http:\/\/purl.org\/vocab\/vann\/",
		  "log": "http:\/\/www.w3.org\/2000\/10\/swap\/log#",
		  "cc": "http:\/\/creativecommons.org\/ns#",
		  "daml": "http:\/\/www.daml.org\/2001\/03\/daml+oil#",
		  "biol": "http:\/\/purl.org\/NET\/biol\/ns#",
		  "mo": "http:\/\/purl.org\/ontology\/mo\/",
		  "label": "http:\/\/purl.org\/net\/vocab\/2004\/03\/label#",
		  "gpt": "http:\/\/purl.org\/vocab\/riro\/gpt#",
		  "dbpedia": "http:\/\/dbpedia.org\/resource\/",
		  "doap": "http:\/\/usefulinc.com\/ns\/doap#",
		  "akt": "http:\/\/www.aktors.org\/ontology\/portal#",
		  "jdbc": "http:\/\/d2rq.org\/terms\/jdbc\/",
		  "event": "http:\/\/purl.org\/NET\/c4dm\/event.owl#",
		  "ical": "http:\/\/www.w3.org\/2002\/12\/cal\/icaltzd#",
		  "dctype": "http:\/\/purl.org\/dc\/dcmitype\/",
		  "coref": "http:\/\/www.rkbexplorer.com\/ontologies\/coref#",
		  "doclist": "http:\/\/www.junkwork.net\/xml\/DocumentList#",
		  "math": "http:\/\/www.w3.org\/2000\/10\/swap\/math#",
		  "dir": "http:\/\/schemas.talis.com\/2005\/dir\/schema#",
		  "akts": "http:\/\/www.aktors.org\/ontology\/support#",
		  "courseware": "http:\/\/courseware.rkbexplorer.com\/ontologies\/courseware#",
		  "usgov": "http:\/\/www.rdfabout.com\/rdf\/schema\/usgovt\/",
		  "scovo": "http:\/\/purl.org\/NET\/scovo#",
		  "dailymed": "http:\/\/www4.wiwiss.fu-berlin.de\/dailymed\/resource\/dailymed\/",
		  "drugbank": "http:\/\/www4.wiwiss.fu-berlin.de\/drugbank\/resource\/drugbank\/",
		  "lib": "http:\/\/schemas.talis.com\/2005\/library\/schema#",
		  "scv": "http:\/\/purl.org\/NET\/scovo#",
		  "frbre": "http:\/\/purl.org\/vocab\/frbr\/extended#",
		  "dummy": "http:\/\/hello.com\/",
		  "audio": "http:\/\/purl.org\/media\/audio#",
		  "sdl": "http:\/\/purl.org\/vocab\/riro\/sdl#",
		  "xen": "http:\/\/buzzword.org.uk\/rdf\/xen#",
		  "contact": "http:\/\/www.w3.org\/2000\/10\/swap\/pim\/contact#",
		  "resex": "http:\/\/resex.rkbexplorer.com\/ontologies\/resex#",
		  "atom": "http:\/\/www.w3.org\/2005\/Atom\/",
		  "ad": "http:\/\/schemas.talis.com\/2005\/address\/schema#",
		  "imm": "http:\/\/schemas.microsoft.com\/imm\/",
		  "kwijibo": "http:\/\/kwijibo.talis.com\/",
		  "ok": "http:\/\/okkam.org\/terms#",
		  "eztag": "http:\/\/ontologies.ezweb.morfeo-project.org\/eztag\/ns#",
		  "bibo": "http:\/\/purl.org\/ontology\/bibo\/",
		  "ddl": "http:\/\/purl.org\/vocab\/riro\/ddl#",
		  "ov": "http:\/\/open.vocab.org\/terms\/",
		  "ezcontext": "http:\/\/ontologies.ezweb.morfeo-project.org\/ezcontext\/ns#",
		  "vcard": "http:\/\/www.w3.org\/2006\/vcard\/ns#",
		  "sv": "http:\/\/schemas.talis.com\/2005\/service\/schema#",
		  "frbr": "http:\/\/purl.org\/vocab\/frbr\/core#",
		  "resist": "http:\/\/www.rkbexplorer.com\/ontologies\/resist#",
		  "acm": "http:\/\/www.rkbexplorer.com\/ontologies\/acm#",
		  "user": "http:\/\/schemas.talis.com\/2005\/user\/schema#",
		  "music": "http:\/\/musicontology.com\/",
		  "atomix": "http:\/\/buzzword.org.uk\/rdf\/atomix#",
		  "aiiso": "http:\/\/purl.org\/vocab\/aiiso\/schema#",
		  "phss": "http:\/\/ns.poundhill.com\/phss\/1.0\/",
		  "memo": "http:\/\/ontologies.smile.deri.ie\/2009\/02\/27\/memo#",
		  "sesame": "http:\/\/www.openrdf.org\/schema\/sesame#",
		  "lom": "http:\/\/ltsc.ieee.org\/rdf\/lomv1p0\/lom#",
		  "myspo": "http:\/\/purl.org\/ontology\/myspace#",
		  "h5": "http:\/\/buzzword.org.uk\/rdf\/h5#",
		  "http": "http:\/\/www.w3.org\/2006\/http#",
		  "media": "http:\/\/purl.org\/media#",
		  "plink": "http:\/\/buzzword.org.uk\/rdf\/personal-link-types#",
		  "lomvoc": "http:\/\/ltsc.ieee.org\/rdf\/lomv1p0\/vocabulary#",
		  "lingvoj": "http:\/\/www.lingvoj.org\/ontology#",
		  "product": "http:\/\/purl.org\/commerce\/product#",
		  "botany": "http:\/\/purl.org\/NET\/biol\/botany#",
		  "commerce": "http:\/\/purl.org\/commerce#",
		  "video": "http:\/\/purl.org\/media\/video#",
		  "zoology": "http:\/\/purl.org\/NET\/biol\/zoology#",
		  "cs": "http:\/\/purl.org\/vocab\/changeset\/schema#",
		  "airport": "http:\/\/www.daml.org\/2001\/10\/html\/airport-ont#",
		  "geonames": "http:\/\/www.geonames.org\/ontology#",
		  "ptr": "http:\/\/www.w3.org\/2009\/pointers#",
		  "po": "http:\/\/purl.org\/ontology\/po\/",
		  "grddl": "http:\/\/www.w3.org\/2003\/g\/data-view#",
		  "gold": "http:\/\/purl.org\/linguistics\/gold\/",
		  "dcam": "http:\/\/purl.org\/dc\/dcam\/",
		  "book": "http:\/\/purl.org\/NET\/book\/vocab#",
		  "xhe": "http:\/\/buzzword.org.uk\/rdf\/xhtml-elements#",
		  "wot": "http:\/\/xmlns.com\/wot\/0.1\/",
		  "cnt": "http:\/\/www.w3.org\/2007\/content#",
		  "tl": "http:\/\/purl.org\/NET\/c4dm\/timeline.owl#",
		  "ttl": "http:\/\/www.w3.org\/2008\/turtle#",
		  "biblio": "http:\/\/purl.org\/net\/biblio#",
		  "vs": "http:\/\/www.w3.org\/2003\/06\/sw-vocab-status\/ns#",
		  "tag": "http:\/\/www.holygoat.co.uk\/owl\/redwood\/0.1\/tags\/",
		  "status": "http:\/\/www.w3.org\/2003\/06\/sw-vocab-status\/ns#",
		  "mit": "http:\/\/purl.org\/ontology\/mo\/mit#",
		  "doc": "http:\/\/www.w3.org\/2000\/10\/swap\/pim\/doc#",
		  "scot": "http:\/\/scot-project.org\/scot\/ns#",
		  "time": "http:\/\/www.w3.org\/2006\/time#",
		  "dcmitype": "http:\/\/purl.org\/dc\/dcmitype\/",
		  "org": "http:\/\/www.w3.org\/2001\/04\/roadmap\/org#",
		  "tags": "http:\/\/www.holygoat.co.uk\/owl\/redwood\/0.1\/tags\/",
		  "taxo": "http:\/\/purl.org\/rss\/1.0\/modules\/taxonomy\/",
		  "dbo": "http:\/\/dbpedia.org\/ontology\/",
		  "ddc": "http:\/\/purl.org\/NET\/decimalised#",
		  "con": "http:\/\/www.w3.org\/2000\/10\/swap\/pim\/contact#",
		  "m": "http:\/\/www.kanzaki.com\/ns\/music#",
		  "moat": "http:\/\/moat-project.org\/ns#",
		  "xfn": "http:\/\/vocab.sindice.com\/xfn#",
		  "gen": "http:\/\/www.w3.org\/2006\/gen\/ont#",
		  "ibis": "http:\/\/purl.org\/ibis#",
		  "dbpprop": "http:\/\/dbpedia.org\/property\/",
		  "states": "http:\/\/www.w3.org\/2005\/07\/aaa#",
		  "lifecycle": "http:\/\/purl.org\/vocab\/lifecycle\/schema#",
		  "wairole": "http:\/\/www.w3.org\/2005\/01\/wai-rdf\/GUIRoleTaxonomy#",
		  "lfm": "http:\/\/purl.org\/ontology\/last-fm\/",
		  "lastfm": "http:\/\/purl.org\/ontology\/last-fm\/",
		  "prj": "http:\/\/purl.org\/stuff\/project\/",
		  "xhtmlvocab": "http:\/\/www.w3.org\/1999\/xhtml\/vocab\/",
		  "resource": "http:\/\/purl.org\/vocab\/resourcelist\/schema#",
		  "spin": "http:\/\/spinrdf.org\/spin#",
		  "spl": "http:\/\/spinrdf.org\/spl#",
		  "list": "http:\/\/www.w3.org\/2000\/10\/swap\/list#",
		  "sp": "http:\/\/spinrdf.org\/sp#",
		  "string": "http:\/\/www.w3.org\/2000\/10\/swap\/string#",
		  "crypto": "http:\/\/www.w3.org\/2000\/10\/swap\/crypto#",
		  "os": "http:\/\/www.w3.org\/2000\/10\/swap\/os#",
		  "timeline": "http:\/\/purl.org\/NET\/c4dm\/timeline.owl#",
		  "e": "http:\/\/eulersharp.sourceforge.net\/2003\/03swap\/log-rules#",
		  "cv": "http:\/\/ontologi.es\/colour\/vocab#",
		  "wn": "http:\/\/xmlns.com\/wordnet\/1.6\/",
		  "climb": "http:\/\/climb.dataincubator.org\/vocabs\/climb\/",
		  "nrl": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/08\/15\/nrl#",
		  "custom": "http:\/\/www.openrdf.org\/config\/sail\/custom#",
		  "giving": "http:\/\/ontologi.es\/giving#",
		  "cert": "http:\/\/www.w3.org\/ns\/auth\/cert#",
		  "doac": "http:\/\/ramonantonio.net\/doac\/0.1\/#",
		  "nao": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/08\/15\/nao#",
		  "air": "http:\/\/dig.csail.mit.edu\/TAMI\/2007\/amord\/air#",
		  "hlisting": "http:\/\/sindice.com\/hlisting\/0.1\/",
		  "gob": "http:\/\/purl.org\/ontology\/last-fm\/",
		  "dbr": "http:\/\/dbpedia.org\/resource\/",
		  "musim": "http:\/\/purl.org\/ontology\/musim#",
		  "nfo": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/03\/22\/nfo#",
		  "wisski": "http:\/\/wiss-ki.eu\/",
		  "gr": "http:\/\/purl.org\/goodrelations\/v1#",
		  "acl": "http:\/\/www.w3.org\/ns\/auth\/acl#",
		  "nid3": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/05\/10\/nid3#",
		  "tmo": "http:\/\/www.semanticdesktop.org\/ontologies\/2008\/05\/20\/tmo#",
		  "ncal": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/04\/02\/ncal#",
		  "nexif": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/05\/10\/nexif#",
		  "protege": "http:\/\/protege.stanford.edu\/system#",
		  "nco": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/03\/22\/nco#",
		  "rsa": "http:\/\/www.w3.org\/ns\/auth\/rsa#",
		  "nmo": "http:\/\/www.semanticdesktop.org\/ontologies\/2007\/03\/22\/nmo#",
		  "like": "http:\/\/ontologi.es\/like#",
		  "swh": "http:\/\/plugin.org.uk\/swh-plugins\/",
		  "u": "http:\/\/purl.org\/NET\/uri#",
		  "rdfg": "http:\/\/www.w3.org\/2004\/03\/trix\/rdfg-1\/",
		  "sparql": "http:\/\/www.openrdf.org\/config\/repository\/sparql#",
		  "skosxl": "http:\/\/www.w3.org\/2008\/05\/skos-xl#",
		  "uri": "http:\/\/purl.org\/NET\/uri#",
		  "fresnel": "http:\/\/www.w3.org\/2004\/09\/fresnel#",
		  "link": "http:\/\/www.w3.org\/2006\/link#",
		  "p3p": "http:\/\/www.w3.org\/2002\/01\/p3prdfv1#",
		  "rei": "http:\/\/www.w3.org\/2004\/06\/rei#",
		  "abc": "http:\/\/www.metadata.net\/harmony\/ABCSchemaV5Commented.rdf#",
		  "af": "http:\/\/purl.org\/ontology\/af\/",
		  "co": "http:\/\/purl.org\/ontology\/chord\/",
		  "chord": "http:\/\/purl.org\/ontology\/chord\/",
		  "mysql": "http:\/\/web-semantics.org\/ns\/mysql\/",
		  "so": "http:\/\/purl.org\/ontology\/symbolic-music\/",
		  "osoc": "http:\/\/web-semantics.org\/ns\/opensocial#",
		  "powder": "http:\/\/www.w3.org\/2007\/05\/powder#",
		  "ctag": "http:\/\/commontag.org\/ns#",
		  "meta": "http:\/\/www.openrdf.org\/rdf\/2009\/metadata#",
		  "sc": "http:\/\/umbel.org\/umbel\/sc\/",
		  "sr": "http:\/\/www.openrdf.org\/config\/repository\/sail#",
		  "obj": "http:\/\/www.openrdf.org\/rdf\/2009\/object#",
		  "sail": "http:\/\/www.openrdf.org\/config\/sail#",
		  "rep": "http:\/\/www.openrdf.org\/config\/repository#",
		  "fed": "http:\/\/www.openrdf.org\/config\/sail\/federation#",
		  "bsbm": "http:\/\/www4.wiwiss.fu-berlin.de\/bizer\/bsbm\/v01\/vocabulary\/",
		  "geographis": "http:\/\/telegraphis.net\/ontology\/geography\/geography#",
		  "money": "http:\/\/telegraphis.net\/ontology\/money\/money#",
		  "code": "http:\/\/telegraphis.net\/ontology\/measurement\/code#",
		  "imreg": "http:\/\/www.w3.org\/2004\/02\/image-regions#",
		  "factbook": "http:\/\/www4.wiwiss.fu-berlin.de\/factbook\/ns#",
		  "common": "http:\/\/www.w3.org\/2007\/uwa\/context\/common.owl#",
		  "swrl": "http:\/\/www.w3.org\/2003\/11\/swrl#",
		  "dcn": "http:\/\/www.w3.org\/2007\/uwa\/context\/deliveryContext.owl#",
		  "java": "http:\/\/www.w3.org\/2007\/uwa\/context\/java.owl#",
		  "hard": "http:\/\/www.w3.org\/2007\/uwa\/context\/hardware.owl#",
		  "swrlb": "http:\/\/www.w3.org\/2003\/11\/swrlb#",
		  "loc": "http:\/\/www.w3.org\/2007\/uwa\/context\/location.owl#",
		  "net": "http:\/\/www.w3.org\/2007\/uwa\/context\/network.owl#",
		  "wgspos": "http:\/\/www.w3.org\/2003\/01\/geo\/wgs84_pos#",
		  "push": "http:\/\/www.w3.org\/2007\/uwa\/context\/push.owl#",
		  "lgd": "http:\/\/linkedgeodata.org\/vocabulary#",
		  "web": "http:\/\/www.w3.org\/2007\/uwa\/context\/web.owl#",
		  "ac": "http:\/\/umbel.org\/umbel\/ac\/",
		  "soft": "http:\/\/www.w3.org\/2007\/uwa\/context\/software.owl#",
		  "sede": "http:\/\/eventography.org\/sede\/0.1\/",
		  "wv": "http:\/\/vocab.org\/waive\/terms\/",
		  "ne": "http:\/\/umbel.org\/umbel\/ne\/",
		  "lode": "http:\/\/linkedevents.org\/ontology\/",
		  "dcq": "http:\/\/purl.org\/dc\/terms\/",
		  "prv": "http:\/\/purl.org\/net\/provenance\/ns#",
		  "irw": "http:\/\/www.ontologydesignpatterns.org\/ont\/web\/irw.owl#",
		  "ir": "http:\/\/www.ontologydesignpatterns.org\/cp\/owl\/informationrealization.owl#",
		  "ire": "http:\/\/www.ontologydesignpatterns.org\/cpont\/ire.owl#"
		};