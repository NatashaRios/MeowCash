#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [FIRApp configure];
    
    self.moduleName = @"MeowCash";
    // Puedes añadir tus props iniciales personalizadas en el diccionario abajo.
    // Serán pasadas al ViewController usado por React Native.
    self.initialProps = @{};

    BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
    if (ret == YES) {
        [RNSplashScreen show];
    }
    return ret;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
