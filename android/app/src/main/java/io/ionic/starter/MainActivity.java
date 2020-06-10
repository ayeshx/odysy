package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.jeep.plugin.capacitor.CapacitorVideoPlayer;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth

import com.getcapacitor.Plugin;

import java.util.ArrayList;




public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
     add(jp.rdlabo.capacitor.plugin.facebook.FacebookLogin.class);
     add(CapacitorVideoPlayer.class);
     add(GoogleAuth.class);
    }});
  }
}
