<?php
    $version = '1.6';
    
    if(isset($_REQUEST['version'])){
        echo $version;
    }

    if(isset($_REQUEST['dataVersion'])){
        echo '
            <p>
                <img src="splash.png" width="150" alt="Taxi Exclusivo"><br><br>
                <label style="font-family:\'nx_bold\'">DETALLES DE LA VERSI&Oacute;N&nbsp;&nbsp;'.$version.'</label>
                <br>
                <p>
                    * Correcci&oacute;n menor de errores. <br>
                    * Ahora Las busquedas son m&aacute;s f&aacute;ciles y organizadas. <br>
                    * La aplicaci&oacute;n inicia 80% m&aacute;s r&aacute;pido. <br>
                    * Acceso a nuestra comunidad de facebook. <br>
                </p>
            </p>
        ';
    }
?>