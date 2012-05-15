<?php
// Damit "." und ".." ausgeschlossen wird.
function startsWith($haystack, $needle) {
	$length = strlen($needle);
	return (substr($haystack, 0, $length) === $needle);
}
// Fügt alle Dateien aus einem gewählten Ordner zwischen Script Tags
function getJsFromDir($dir) {
     $handle=opendir ($dir);
        while ($datei = readdir ($handle)) {
            
            if(!startsWith('.', $datei) && !startsWith('..', $datei)){
                ?>
<script src="<?php echo $dir.$datei ?>" type="text/javascript"></script> 
                    <?php
            }
                
        }
        
 }
?>
<!DOCTYPE html> 
<html> 
    <head> 
        <title>WebMario</title>
        <!--        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>-->
        <?php
        getJsFromDir("js/main/");
        getJsFromDir("js/modules/");
        ?>  

    </head> 
    <body> 
    </body> 
</html>